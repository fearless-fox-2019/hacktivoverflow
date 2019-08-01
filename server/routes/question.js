const routes = require('express').Router();
const { ControllerQuestion } = require('../controllers/index');
const { authentication, authorization } = require('../middlewares/auth');

routes.get('/questionuser', authentication, ControllerQuestion.getAuthor)
routes.get('/all', ControllerQuestion.getAll)
routes.get('/:id', ControllerQuestion.getOne)
routes.post('/create', authentication, ControllerQuestion.create)
routes.patch('/update/:id', authentication, authorization, ControllerQuestion.update)
routes.delete('/delete/:id', authentication, authorization, ControllerQuestion.destroy)
routes.patch('/vote/:id', authentication, ControllerQuestion.vote)

module.exports = routes