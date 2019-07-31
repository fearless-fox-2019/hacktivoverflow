const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')
router.get('/allQuestions',QuestionController.getAllQuestions)
router.use(authentication)
router.post('/',QuestionController.create)
router.get('/',QuestionController.getQuestionByUser)
router.patch('/upVote/:id',QuestionController.upvote)
router.patch('/downVote/:id',QuestionController.downvote)

module.exports = router