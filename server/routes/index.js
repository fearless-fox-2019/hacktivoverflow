const router = require('express').Router()
const questionRoute = require('./questionRoute')
const answerRoute = require('./answerRoute')
const UserController = require('../controllers/userController')
const {authentication, authorization} = require('../middlewares/auth')


router.post('/login', UserController.login)
router.post('/register', UserController.create)

router.get('/user/:id', UserController.findById)
router.put('/user/:id', authentication, UserController.editTag)

router.use('/questions', questionRoute)
router.use('/answers', answerRoute)

module.exports = router