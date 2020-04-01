
const MongoClient = require('mongodb').MongoClient

module.exports.connectToDb = async url => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
  } catch (err) {
    console.log(err)
  }

  const db = client.db("db");
  return [ db, client ]
};
