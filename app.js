'use strict';

const Controller = require('./api/controllers/controller');

const router = {
  '/courses/getAllCourses': (request, response) => Controller.getAllCourses(request, response),
  '/courses/getPair': (request, response) => Controller.getUniquePair(request, response)
};

const app = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  const { url } = request;
  const sendRequest = router[url];
  sendRequest(request, response);
  response.statusCode = 404;
  return response.end(JSON.stringify({ message: 'No such route' }));
};

module.exports = app;
