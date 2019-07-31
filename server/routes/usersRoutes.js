const router = require('express').Router()
const UserController = require('../controllers/userController')
// const StudentController = require('../controller/studentController')
router.post('/login',UserController.login)
router.post('/register',UserController.create)
module.exports = router
