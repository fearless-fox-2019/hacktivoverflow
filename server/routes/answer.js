const router = require('express').Router()
const answerController = require ('../controllers/answerController')
const auth = require('../middlewares/authen');

router.post('/', auth, answerController.create)
router.get('/',answerController.read)
router.patch('/upvote',auth, answerController.upVote)
router.patch('/downvote',auth, answerController.downVote)
router.put('/:id',auth, answerController.update)

module.exports = router