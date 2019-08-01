const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const AnswerController = require('../controllers/answer-controller')

//find answer
router.get('/:questionId', AnswerController.findAnswer)

router.use(auth.authentication)

// create & delete answer
router.post('/:questionId', AnswerController.makeAnswer)
router.delete('/:questionId/:answerId/', AnswerController.deleteAnswer)


// edit answer
router.delete('/:answerId', AnswerController.updateAnswer)

module.exports = router