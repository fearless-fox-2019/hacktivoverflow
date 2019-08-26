const route = require('express').Router()
const userController = require('../controllers/userController.js')

route.post('/', userController.register)
route.post('/login', userController.login)
route.get('/', userController.allUser)
// route.get('/:id', userController)
// route.put('/:id', userController)
// route.delete(':id', userController)

module.exports = route
