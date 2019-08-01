const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userCon')
const { Authentication, Authorization } = require('../middlewares/auth')

Router.post('/signup', userController.signUp)
Router.post('/signin', userController.signIn)
Router.use(Authentication)
Router.patch('/savetag', userController.saveTag)
Router.patch('/deletetag', userController.deleteTag)
Router.get('/', userController.findUser)

module.exports = Router;