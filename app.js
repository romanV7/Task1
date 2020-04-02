'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const coursesRoutes = require('./api/routes/courses')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/courses', coursesRoutes)

module.exports = app
