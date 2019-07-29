const router = require('express').Router()
const answerController = require('../controllers/answerController')

router.get('/:qeustionId',answerController.findAll)//findall answer

router.post('/',answerController.create)//create answer

router.patch('/up/:answerId',answerController.upvote)//upvote
router.patch('/down/:answerId',answerController.donwvote)//downvote
router.patch('/:answerId', answerController.update)//update

router.delete('/:answerId', answerController.delete)//delete answer

module.exports = router