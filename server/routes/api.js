const router = require('express').Router()
const apiController = require ('../controllers/apiController')

router.get('/jobs',apiController.getJob)

module.exports = router