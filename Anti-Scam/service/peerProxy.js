// peerProxy.js
const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  httpServer.on('upgrade', (request, socket, head) => {
    if (request.url === '/ws') { // Ensure the upgrade is for the WebSocket endpoint
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  let connections = [];

  function sendMessage(data) {
    const message = JSON.stringify(data);
    connections.forEach((c) => {
      c.ws.send(message);
    });
  }
  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);
    ws.on('message', function message(data) {
    });
    ws.on('close', () => {
      connections = connections.filter((c) => c.id !== connection.id);
    });
    ws.on('pong', () => {
      connection.alive = true;
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
  return { sendMessage };
}

module.exports = { peerProxy };
