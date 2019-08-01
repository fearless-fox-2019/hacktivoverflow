const routes = require('express').Router();
const { ControllerJob } = require('../controllers/');

routes.get('/', ControllerJob.fetchJob)

module.exports = routes
