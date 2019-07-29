const router = require('express').Router()
const tagController = require('../controllers/tagController')

router.get('/', tagController.findAll) // findall tag
router.get('/tag/:tagId', tagController.findByBag) // find by tag
router.patch('/user/:userId', tagController.findByWatcher) // find by user
router.post('/', tagController.create) // createtag
router.patch('/:tagId', tagController.update) // update tag
router.patch('/:tagId', tagController.delete) // delete tag

module.exports = router
