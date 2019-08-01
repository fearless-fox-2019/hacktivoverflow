const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authenticate');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/userLoggedIn', authenticate, UserController.findOne);

module.exports = router;