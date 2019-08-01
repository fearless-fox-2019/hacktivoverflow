const router = require('express').Router()
const userController = require ('../controllers/userController')
const auth = require('../middlewares/authen');

router.post('/signup', userController.signup)
router.post('/signin',userController.signin)
router.patch('/',auth,userController.update)
router.get('/',userController.find)

module.exports = router