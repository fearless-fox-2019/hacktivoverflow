const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
router.get('/allQuestions',QuestionController.getAllQuestions)
router.get('/:id',QuestionController.questionDetail)
router.use(authentication)
router.post('/',QuestionController.create)
router.get('/',QuestionController.getQuestionByUser)
router.patch('/upVote/:id',QuestionController.upvote)
router.patch('/downVote/:id',QuestionController.downvote)
router.patch('/:id',QuestionController.questionUpdate)
router.delete('/:id',QuestionController.delete)


module.exports = router