const router = require('express').Router()
const answerController = require('../controllers/answerController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', answerController.findAll)
router.use(authentication)
router.post('/', answerController.create)
router.delete('/', answerController.delete)
router.patch('/:id', authorization, answerController.updateContent)
router.patch('/upvote/:id', answerController.upVote)
router.patch('/downvote/:id', answerController.downVote)

module.exports = router