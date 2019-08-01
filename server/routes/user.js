const routes = require('express').Router();
const { ControllerUser } = require('../controllers/index');

routes.post('/signup', ControllerUser.signUp)
routes.post('/signin', ControllerUser.signIn)

module.exports = routes
