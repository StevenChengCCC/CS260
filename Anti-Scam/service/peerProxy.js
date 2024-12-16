const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  let connections = [];

  wss.on('connection',function connection (ws) {
    const connection = { id: uuid.v4(), alive: true, ws: ws,username: null };
    connections.push(connection);

    
  
    ws.on('close', () => {
      const pos = connections.findIndex((o) => o.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });

    ws.on('message',  (messages)=>{
      const scores = DB.getHighScores();
      // console.log(scores);
      const scoreboardMessage = JSON.stringify({ type: 'scoreboard', scores });
      const receivedMsg = JSON.parse(messages);
      if (receivedMsg.type === 'user_login') {
        // console.log(receivedMsg);
        const username = receivedMsg.username;
        connection.username = username;
      }
      ws.send(scoreboardMessage);
      broadcastUserStatus(connection,scores);
    });

  });
  setInterval(() => {
    connections.forEach((c) => {
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
  function broadcastUserStatus(newConnection, username) {
    // console.log(newConnection);
    const message = JSON.stringify({
      type: 'user_status',
      username: newConnection.username
    });
    connections.forEach((c) => {
      if (c.id !== newConnection.id) {
        c.ws.send(message);
      }
    });
  }
}

module.exports = { peerProxy };