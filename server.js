'use strict'

const http = require('http')
const app = require('./app')
const db = require('./database')


db.connect('mongodb://localhost:27017/database', err => {
  if (err) return console.log(err)
  const port = process.env.PORT || 3000
  const server = http.createServer(app)
  server.listen(port)
})
