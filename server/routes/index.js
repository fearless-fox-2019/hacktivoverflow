const route = require('express').Router()
const questionRouter = require('./questionRoutes.js')
const userRouter = require('./userRoutes.js')
const answerRouter = require('./answerRoutes.js')

route.use('/questions', questionRouter)
route.use('/users', userRouter)
route.use('/answers', answerRouter)

module.exports = route