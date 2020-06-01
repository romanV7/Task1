'use strict';

const db = require('../../database');

module.exports.findUniquePair = (query, callback) =>
  db.get().collection('collection').find(query).toArray((err, result) =>
    callback(err, result)
  );

module.exports.findAll = callback =>
  db.get().collection('collection').find().toArray((err, result) =>
    callback(err, result)
  );

/*
module.exports.findAll = callback =>
  db.get().collection('collection').find({ }, { "receivedId": 1, "gottenId": 1 }).toArray((err, result) =>
    callback(err, result)
  )
*/
