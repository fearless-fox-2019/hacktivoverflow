const express = require("express")
const router = express.Router()
const questionController = require("../controllers/question-controller")
const authenticate = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorizationsQuestion')
const cronJob = require('../middlewares/cronJob')

router.get("/", questionController.get)
router.get("/getQuotes", cronJob, questionController.getQuote)
router.get("/:id", questionController.getOne)
router.use(authenticate)
router.post("/", questionController.create)
router.post("/upvote/:id", questionController.upVote)
router.post("/downvote/:id", questionController.downVote)
router.use(cronJob)
// router.put("/stock/:id", questionController.updateStock)
router.delete("/:id", authorization, questionController.destroy)
router.put("/:id", authorization, questionController.update)
// router.post("/size", questionController.addSize)


module.exports = router