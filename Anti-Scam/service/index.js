const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const http = require('http');
const app = express();
const { peerProxy } = require('./peerProxy');
const DB = require('./database.js');
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

// Middleware to identify user from token cookie
app.use(async (req, res, next) => {
  const token = req.cookies[authCookieName];
  if (token) {
    const user = await DB.getUserByToken(token);
    if (user) {
      req.user = { username: user.username };
    }
  }
  next();
});

const server = http.createServer(app);
const { sendMessage } = peerProxy(server);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.post('/score/currentscore', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const { score } = req.body;
  const user = req.user.username;
  await DB.updateScore(user, score);
  const userScore = await DB.getUserScore(user);

  const leaderboard = await DB.getHighScores();
  sendMessage({ type: 'leaderboard', data: leaderboard });
  sendMessage({ type: 'scoreSubmitted', user: user, score: userScore });

  res.send({ currentScore: userScore });
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
