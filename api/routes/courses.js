'use strict'

const express = require('express')
const router = express.Router()

// TODO middleware jwt

router.get('/', (req, res) => {})
router.get('/:send_currency/:receive_currency', (req, res) => {})

module.exports = router
