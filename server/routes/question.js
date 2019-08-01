const express = require('express')
const questionRouter = express.Router()
const QuestionController = require('../controllers/question')
const authentication = require('../middlewares/authentication')
const {authorizationQ} = require('../middlewares/authorization')

questionRouter.get('/all',QuestionController.fetch)
questionRouter.use(authentication)
questionRouter.get('/myquestion',QuestionController.fetchMine)
questionRouter.post('/',QuestionController.create)

questionRouter.patch('/downvote/:questionid',QuestionController.updateDownVote)
questionRouter.patch('/upvote/:questionid',QuestionController.updateUpVotes)
questionRouter.use('/:questionid',authorizationQ)
questionRouter.delete('/:questionid',QuestionController.delete)
questionRouter.put('/:questionid',QuestionController.EditQuestion)


module.exports = questionRouter