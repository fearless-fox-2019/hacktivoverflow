const router = require('express').Router()
const questionController = require ('../controllers/questionController')
const auth = require('../middlewares/authen');

router.post('/', auth, questionController.create)
router.get('/',questionController.read)
router.put('/:id/',auth, questionController.update)
router.patch('/:id/upvote',auth, questionController.upVote)
router.patch('/:id/downvote',auth, questionController.downVote)
router.delete('/:id',auth,questionController.delete)

module.exports = router