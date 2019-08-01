const router = require('express').Router()
const Question = require('../controllers/question')
const {authentication, authorization} = require('../middlewares/auth')


router.get('/', Question.getAll)
router.get('/:id', Question.findOne)
router.use(authentication)
router.post('/', Question.create)
router.patch('/:id', Question.updownVotes)
router.get('/user/posts', Question.findByUser)

// router.use(authorization)
router.delete('/:id', Question.delete)
router.get('/user/:userid', Question.getQuestionByUser)
router.patch('/update/:id', Question.update)

module.exports = router