const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorizationAnswer')

router.get('/:questionId',AnswerController.findAnswer)
router.use(authentication)
router.post('/',AnswerController.create)
router.patch('/upVote/:id',AnswerController.upVote)
router.patch('/downVote/:id',AnswerController.downVote)
router.patch('/:id',authorization,AnswerController.answerUpdate)

module.exports = router