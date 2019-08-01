const router = require('express').Router()
const User = require('../controllers/user')
const {authentication, authorization} = require('../middlewares/auth')


// user register /users/register
router.post('/register', User.resgister)
// user login /users/login
router.post('/login', User.login)

router.get('/userdata', authentication, (req, res, next) => {
    res.status(200).json(req.decoded)
})
router.use(authentication)
// , authorization
// get all user /users
router.get('/', User.getAll)
router.use(authorization)
router.patch('/', User.update) // masih bingung sama ini di answer juga kalo pake authorization
module.exports = router