const router = require('express').Router()
const questionController = require('../controllers/questionController')
const {authentication, question_authorization  } = require('../middlewares/auth')

router.get('/', questionController.findAll) // findall question
router.get('/title', questionController.searchbytitle)
router.get('/tag', questionController.searchbytag)
router.get('/:questionId', questionController.findOne) // findone question

router.use('/', authentication)

router.post('/', questionController.create) // create question

router.patch('/up/:questionId', questionController.upvote) // upvote
router.patch('/down/:questionId', questionController.donwvote) // downvote
router.patch('/:questionId', question_authorization, questionController.update) // update

router.delete('/:questionId', question_authorization, questionController.delete) // delete question

module.exports = router
