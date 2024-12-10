const express = require('express');
const uuid = require('uuid');
const app = express();

let users = {};
let scores = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: 'Email and password are required' });
    }
  
    const existingUser = users[email];
    if (existingUser) {
      return res.status(409).send({ msg: 'User already exists' });
    }
  
    const user = { email, password, token: uuid.v4() };
    users[email] = user;
    res.send({ token: user.token });
  });