const router = require('express').Router()
const Answer = require('../controllers/answer')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/', Answer.getAll)
router.get('/question/:id', Answer.getAllByIdQuestion)
router.use(authentication)
router.post('/:questionid', Answer.create)
router.patch('/answervote/:id', Answer.updateAnswerVote)
// router.use(authorization)
router.patch('/:id', Answer.update) // masih bingung sama ini di user juga kalo pake authorization

module.exports = router