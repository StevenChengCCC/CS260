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
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ msg: 'Username and password required' });
    } //remove the simon code
  
    if (users[username]) {
      return res.status(409).send({ msg: 'Existing user' });
    }
    users[username] = { password, score: 0 }; //set the default score to 0
    res.send({ msg: 'User created successfully' });
  });