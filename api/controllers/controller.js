'use strict'

require('dotenv').config()
const Courses = require('../services/courses')

module.exports.getUniquePair = (req, res) => {
  const receivedId = Number(req.params.send_currency)
  const gottonId = Number(req.params.receive_currency)
  Courses.findUniquePair({ receivedId, gottonId }, (err, doc) => {
    console.log(doc)
    if (err) res.status(500).json({ error: err })
    //if (!doc) res.status(404).json({ message: "Pair not found" })
    res.status(200).json(doc)
  })
}

module.exports.getAllCourses = (req, res) => {
  Courses.findAll((err, docs) => {
    if (err) res.status(500).json({ error: err })
    res.status(200).json(docs)
  })
}
