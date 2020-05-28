'use strict'

require('dotenv').config()
const Courses = require('../services/courses')
const md5 = require('blueimp-md5')

module.exports.getAllCourses = (req, res) => {
  Courses.findAll((err, docs) => {
    if (err) return res.statusCode = 500
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(docs))
  })
}

module.exports.getUniquePair = (req, res) => {
  const send_currency = req.url.split('/')[3]
  const receive_currency = req.url.split('/')[4]
  const { base64 } = req.headers
  const concatenated = [send_currency, receive_currency, process.env.IV].join(':')
  const hash = md5(concatenated)
  const base64_server = Buffer.from(hash).toString('base64')
  if (base64_server !== base64) {
    res.statusCode = 401
    return res.end(JSON.stringify({ message: "Access denided: Checksum does not match" }))
  }
  const receivedId = parseInt(send_currency)
  const gottenId = parseInt(receive_currency)
  Courses.findUniquePair({ receivedId, gottenId }, (err, doc) => {
    if (err) {
      res.statusCode = 500
      return res.end(JSON.stringify({ error: err  }))
    }
    if (doc.length === 0) {
      res.statusCode = 404
      return res.end(JSON.stringify({ message: "Pair not found try another one" }))
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(doc))
  })
}
