const router = require('express').Router()
const userController = require('../controllers/userController')
const { authentication } =require('../middlewares/auth')

router.post('/signin',userController.signin) //signin
router.post('/signup', userController.signup)//signup
router.use('/', authentication)
router.get('/logedUser',userController.logeduser)//logeduser
router.patch('/newWatch',userController.watchedtag)
router.patch('/removeWatchtag',userController.removewatch)
//3rdparty signin

module.exports = router