const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/signin',userController.signin) //signin
router.post('signup', userController.signup)//signup
router.get('/logedUser',userController.logeduser)//logeduser
//3rdparty signin

module.exports = router