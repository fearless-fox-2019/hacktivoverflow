const router = require('express').Router()
const userRoutes = require('./users')
const questionRoutes = require('./questions')
const answerRoutes = require('./answers')
const tagRoutes = require('./tags')
const cronRoutes = require('./cron')

router.use('/cron', cronRoutes)
router.use('/users', userRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)
router.use('/tags', tagRoutes)

module.exports = router