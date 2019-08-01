const router = require('express').Router()
const authentication = require('../middleware/authentication')

const authorization = function(req, res, next) {
    if (req.params.id === req.decoded._id) {
        next()
    } else {
        res.status(401).json({
            message: "You're not this user, who you are?"
        })
    }
}

//routers
const questionRouter = require('./questionRoutes')
const answerRouter = require('./answerRoutes')

//controllers
const userController = require('../controllers/userController')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.patch('/user/:id', authentication, authorization, userController.addTag)
router.get('/user/:id', authentication, userController.findOne)

router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

module.exports = router

