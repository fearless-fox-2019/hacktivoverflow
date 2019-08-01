const routes = require("express").Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middlewares/authentication')

routes.use(authentication)
routes.post("/", questionController.create)
routes.get("/", questionController.readAllQuestion)
routes.get("/:id", questionController.readOwnQuestion)

module.exports = routes