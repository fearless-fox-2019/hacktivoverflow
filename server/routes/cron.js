const router = require('express').Router()
const ControllerCron = require('../controllers/cron')

router.get('/', ControllerCron.getStack)

module.exports = router