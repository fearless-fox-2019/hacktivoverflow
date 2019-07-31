const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/',AnswerController.create)
router.post('/upVote/:id',AnswerController.upVote)
router.post('/downVote/:id',AnswerController.downVote)

module.exports = router