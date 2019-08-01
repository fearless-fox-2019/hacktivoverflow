const express = require('express');
const Router = express.Router();
const commentController = require('../controllers/commentCon')
const { Authentication, Authorization } = require('../middlewares/auth')

Router.get('/postId/:id', commentController.findByPostId)
Router.use(Authentication)
Router.post('/', commentController.create)
Router.get('/userId', commentController.findByUserId)
Router.put('/:id', commentController.update)
Router.put('/upvotes/:id', commentController.upvotes)
Router.put('/downvotes/:id', commentController.downvotes)

module.exports = Router;