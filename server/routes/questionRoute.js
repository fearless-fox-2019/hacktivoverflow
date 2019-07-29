const router = require('express').Router()
const questionController = require('../controllers/questionController')

router.get('/',questionController.findAll)//findall question
router.get('/:questionId',questionController.findOne)//findone question

router.post('/',questionController.create)//create question

router.patch('/up/:questionId',questionController.upvote)//upvote
router.patch('/down/:questionId',questionController.donwvote)//downvote
router.patch('/:questionId', questionController.update)//update

router.delete('/:questionId', questionController.delete)//delete question



module.exports = router