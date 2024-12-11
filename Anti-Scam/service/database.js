const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('username');
const scoreCollection = db.collection('score');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return user;
}

async function addScore(score) {
  return scoreCollection.insertOne(score);
}

async function deleteUser(username) {
  await userCollection.deleteOne({ username: username });
  await scoreCollection.deleteMany({ username: username });
}

function getHighScores() {
  const query = {};
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}
async function updateScore(username, newScore) {
  const existing = await scoreCollection.findOne({ username });
  if (!existing) {
    await scoreCollection.insertOne({ username, score: newScore });
  } else if (newScore > existing.score) {
    await scoreCollection.updateOne({ username }, { $set: { score: newScore } });
  }
}
async function getUserScore(username) {
  const record = await scoreCollection.findOne({ username: username });
  return record ? record.score : null;
}
module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  deleteUser,
  getHighScores,
  updateScore,
  getUserScore,
};
