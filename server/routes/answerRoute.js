const router = require('express').Router()
const answerController = require('../controllers/answerController')
const { authentication, answer_authorization } = require('../middlewares/auth')

router.get('/:questionId', answerController.findAll) // findall answer

router.use('/', authentication)

router.post('/:questionId', answerController.create) // create answer

router.patch('/up/:answerId', answerController.upvote) // upvote
router.patch('/down/:answerId', answerController.donwvote) // downvote
router.patch('/:answerId', answer_authorization, answerController.update) // update

router.delete('/:answerId', answer_authorization, answerController.delete) // delete answer

module.exports = router