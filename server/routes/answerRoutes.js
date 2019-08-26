const route = require('express').Router()
const answerController = require('../controllers/answerController.js')
const authentication = require('../middleware/authentication.js')
const authorization = require('../middleware/authAnswer.js')

route.post('/', authentication, answerController.addAnswer)
route.get('/', answerController.getAnswer)
route.get('/:id', answerController.getOneAnswer)
route.patch('/upvote/:id', authentication, answerController.upVoteAnswer)
route.patch('/downvote/:id', authentication, answerController.downVoteAnswer)
//delete
route.delete('/:id', authentication, authorization, answerController.deleteAnswer)

module.exports = route