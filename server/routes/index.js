const router = require('express').Router()
const UserRouter = require('./user')
const QuestionRouter = require('./question')
const AnswerRouter = require('./answer')

router.use('/users', UserRouter)
router.use('/questions', QuestionRouter)
router.use('/answers', AnswerRouter)


module.exports = router