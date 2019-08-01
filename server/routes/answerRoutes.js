const router = require('express').Router()
const {authentication} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')
const AnswerController = require('../controllers/AnswerController')

router.use(authentication)
router.post('/create/:id', AnswerController.create)
router.get('/:id', AnswerController.findAllAnswer)
router.delete('/:id', AnswerController.delete)
router.get('/getUpdate/:id', AnswerController.findOne)
router.patch('/:id', AnswerController.update)

module.exports = router