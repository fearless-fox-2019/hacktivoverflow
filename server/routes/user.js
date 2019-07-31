const router= require('express').Router()
const userController= require('../controllers/userController')
const {authentication}= require('../middlewares/authentication')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/loginGoogle', userController.loginGoogle)
router.get('/', authentication, userController.getUser)
router.patch('/', authentication, userController.updateTag)

module.exports=router