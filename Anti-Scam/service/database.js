const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('dbConfig.json');
const url = `mongodb+srv://${cs260password}:${stevenchengcs260}@${cluster0.olg5v.mongodb.net}`;
const client = new MongoClient(url);
const dbName = 'startup';
let userCollection=db.collection('users');
let scoreCollection=db.collection('scores');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database at ${url} because ${ex.message}`);
    process.exit(1);
  });

  function getUser(username) {
    return userCollection.findOne({ username: username });// use find one to read from database
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token }); // use find one to read from database
  }
  
  async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      username: username,
      password: passwordHash,
      token: uuid.v4(),
      createdAt: new Date()
    };
    await userCollection.insertOne(user);
    return user;
  }


  async function updateUserToken(username, newToken) {
    await userCollection.updateOne({ username: username }, { $set: { token: newToken } });
  }
  async function deleteUser(username) {
    await userCollection.deleteOne({ username: username }); // I dont know why simon does not have this delete account function
    await scoreCollection.deleteOne({ username: username}); // it is delete user and score
  }

  async function addScore(score) {
    score.timestamp = new Date();
    return scoreCollection.insertOne(score);
  }

  function getHighScores() {
    const query = { score: { $gt: 0 } };
    const options = {
      sort: { score: -1 },
      limit: 10,
    };
    return scoreCollection.find(query, options).toArray();
  }
  
  async function updateScore(username, newScore) {
    const userScore = await scoreCollection.findOne({ username: username });
    if (!userScore) {
      return addScore({ username, score: newScore });
    } else {
      if (newScore > userScore.score) {
        await scoreCollection.updateOne({ username: username }, { $set: { score: newScore, updatedAt: new Date() } });
      }
    }
    return scoreCollection.findOne({ username: username });
  }
  

  
  module.exports = {
    getUser,
    getUserByToken,
    createUser,
    updateUserToken,
    deleteUser,
    addScore,
    getHighScores,
    updateScore
  };