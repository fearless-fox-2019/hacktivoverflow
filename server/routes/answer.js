const routes = require('express').Router();
const { ControllerAnswer } = require('../controllers/index');
const { authentication, authorizationAnswer } = require('../middlewares/auth');

routes.post('/post', authentication, ControllerAnswer.create)
routes.get('/user', authentication, ControllerAnswer.getAuthor)
routes.patch('/update/:id', authentication, authorizationAnswer, ControllerAnswer.update)
routes.delete('/delete/:id', authentication, authorizationAnswer, ControllerAnswer.destroy)
routes.patch('/vote/:id', authentication, ControllerAnswer.vote)
module.exports = routes