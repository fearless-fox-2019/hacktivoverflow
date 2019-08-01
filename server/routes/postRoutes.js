const router = require('express').Router()
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const PostController = require('../controllers/PostController')

router.get('/findAll', PostController.findAll)
router.use(authentication)
router.get('/findUser', PostController.findUserPosts)
router.get('/:id', PostController.findOne)
router.post('/create', PostController.create)
router.delete('/:id', authorization, PostController.delete)
router.patch('/:id', authorization, PostController.update)
router.patch('/downvote/:id', PostController.downvotes)
router.patch('/upvotes/:id', PostController.upvotes)

module.exports = router