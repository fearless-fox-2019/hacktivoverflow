const routes = require('express').Router();
const user = require('./user');
const question = require('./question');
const answer = require('./answer');
const jobs = require('./job');

routes.use('/users', user)
routes.use('/questions', question)
routes.use('/answers', answer)
routes.use('/jobs', jobs)

module.exports = routes
