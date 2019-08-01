const router = require('express').Router()
const postController = require('../controllers/postController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', postController.findAll)
router.get('/findOne/:id', postController.findOne)
router.use(authentication)
router.get('/myPost', postController.findMyPost)
router.post('/', postController.create)
router.delete('/:id', authorization, postController.delete)
router.patch('/:id', authorization, postController.updateContent)
router.patch('/upvote/:id', postController.upVote)
router.patch('/downvote/:id', postController.downVote)

module.exports = router