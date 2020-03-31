'use strict'

const express = require('express')
const router = express.Router()

// TODO middleware jwt
const sign = require('../middleware/Signature')

router.get('/', (req, res) => {
  const headers = req.headers.cookie
  console.log(headers)
  res.send(headers)
})

router.get('/:send_currency/:receive_currency', (req, res) => {})

module.exports = router
