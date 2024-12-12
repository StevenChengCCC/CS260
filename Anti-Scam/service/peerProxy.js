const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js'); // Add this line to access DB

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  let connections = [];

  wss.on('connection', async (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // On new connection, send the current leaderboard
    const scores = await DB.getHighScores();
    const scoreboardMessage = JSON.stringify({ type: 'scoreboard', scores });
    ws.send(scoreboardMessage);

    // When a message is received, re-broadcast the updated leaderboard
    ws.on('message', async function message(data) {
      // On any received message, fetch and broadcast the latest scores
      const scores = await DB.getHighScores();
      const scoreboardMessage = JSON.stringify({ type: 'scoreboard', scores });
      connections.forEach((c) => {
        c.ws.send(scoreboardMessage);
      });
    });

    ws.on('close', () => {
      const pos = connections.findIndex((o) => o.id === connection.id);
      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Ping each connection every 10 seconds to ensure they are alive
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
}

module.exports = { peerProxy };
