const express = require('express')
const userRouter = express.Router()
const UserController = require('../controllers/user')
const authentication = require('../middlewares/authentication')

userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.use(authentication)
userRouter.get('/',UserController.findUser)
userRouter.patch('/',UserController.addWatchedTag)

module.exports = userRouter