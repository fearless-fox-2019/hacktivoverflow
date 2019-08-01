const router = require('express').Router()
const ControllerTag = require('../controllers/tags')

router.get('/', ControllerTag.findAll)

module.exports = router