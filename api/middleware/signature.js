'use strict'

const jwt = require('jsonwebtoken')

const generateAccessToken = query => {
  return jwt.sign(query, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

const generateRefreshToken = query => {
  return jwt.sign(query, process.env.REFRESH_TOKEN_SECRET)
}

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  console.log({ authHeader })
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, query) => {
    if (err) return res.sendStatus(403)
    req.query = query
    console.log('gotten result too, it works')
    next()
  })
}
