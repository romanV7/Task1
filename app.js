'use strict'

const Controller = require('./api/controllers/controller')

const app = (request, response) => {
  const { headers, method, url } = request
  if (url === '/courses/getAllCourses') return Controller.getAllCourses(request, response)
  if (url.includes('/courses/getPair')) return Controller.getUniquePair(request, response)
  response.statusCode = 404
  return response.end(JSON.stringify({ message: "No such rout" }))
}

module.exports = app
