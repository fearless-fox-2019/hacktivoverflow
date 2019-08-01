const router = require('express').Router()
const userRouter = require('./user')
const questionRouter = require('./question');
const answerRouter = require('./answer');
const apiRouter = require('./api');

router.use('/users',userRouter)
router.use('/questions',questionRouter)
router.use('/answers',answerRouter)
router.use('/api',apiRouter)

module.exports = router