const route = require('express').Router()
const questionController = require('../controllers/questionController.js')
const authentication = require('../middleware/authentication.js')


route.post('/', authentication, questionController.createQuestion)
route.get('/', questionController.getAllQuestion)
route.get('/:id', questionController.getOneQuestion)
route.delete('/:id', questionController.deleteQuestion)
route.put('/:id', questionController.updateQuestion)
//upvote
route.patch('/upvote/:id', authentication, questionController.upVote)
//downvote
route.patch('/downvote/:id', authentication, questionController.downVote)

module.exports = route