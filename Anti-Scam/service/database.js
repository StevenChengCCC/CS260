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



  module.exports = {
    getUser,
    getUserByToken,
    createUser,
  };