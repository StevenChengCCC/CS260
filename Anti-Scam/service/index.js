const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let scores = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ msg: 'Username and password required' });
    }
    if (users[username]) {
      return res.status(409).send({ msg: 'Existing user' });
    }
    users[username] = { password, score: 0 };
    res.send({ msg: 'User created successfully' });
  });

apiRouter.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (!user || user.password !== password) {
    return res.status(401).send({ msg: 'Username or password is incorrect' });
  }
  user.token = uuid.v4();
  res.send({ token: user.token });
});

apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

apiRouter.post('/score/currentscore', (req, res) => {
  const { token, score } = req.body;
  const username = Object.keys(users).find(u => users[u].token === token);
  if (!username) {
    return res.status(401).send({ msg: 'DNE' });
  }
  const user = users[username];
  if (score > user.score) {
    user.score = score;
  }
  res.send({ currentScore: user.score });
});

apiRouter.get('/score/current', (req, res) => {
  const token = req.query.token;
  const username = Object.keys(users).find(u => users[u].token === token);
  if (!username) {
    return res.status(401).send({ msg: 'DNE' });
  }
  const user = users[username];
  res.send({ currentScore: user.score });
});
  
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });