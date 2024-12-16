const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);
const { peerProxy } = require('./peerProxy.js');

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

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ msg: 'Username and password required' });
  }

  const existingUser = await DB.getUser(username);
  if (existingUser) {
    return res.status(409).send({ msg: 'Existing user' });
  }

  const user = await DB.createUser(username, password);
  setAuthCookie(res, user.token);
  res.send({ id: user._id, token: user.token, msg: 'User created successfully' });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await DB.getUser(username);
  if (user && await bcrypt.compare(password, user.password)) {
    setAuthCookie(res, user.token);
    res.send({ id: user._id, token: user.token });
  } else {
    res.status(401).send({ msg: 'Username or password is incorrect' });
  }
});

apiRouter.delete('/auth/logout', (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/score/current', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const user = req.user.username;
  
  const userScore = await DB.getUserScore(user); 
  
  res.send({ currentScore: userScore !== null ? userScore : 0 });
});


apiRouter.post('/score/currentscore', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const { score } = req.body;
  const user = req.user.username;
  await DB.updateScore(user, score);
  const scores = await DB.getHighScores();
  const userScore = scores.find(s => s.username === user) || { score: 0 };
  res.send({ currentScore: userScore.score });
});

apiRouter.delete('/user/delete', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const user = req.user.username;
  await DB.deleteUser(user);
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.post('/score/add', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const { score } = req.body;
  const user = req.user.username;
  await DB.addScore({ username: user, score: score, ip: req.ip });
  res.send({ msg: 'Score added successfully' });
});

apiRouter.get('/scores', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ msg: 'Not authenticated' });
  }
  const scores = await DB.getHighScores();
  res.send(scores);
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

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(server);
