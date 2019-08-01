const express = require("express")
const router = express.Router()
const userRouter = require("./user-route")
const questionRouter = require("./question-route")
const answerRouter = require("./answer-route")

router.use("/answers", answerRouter)
router.use("/users", userRouter)
router.use("/questions", questionRouter)

module.exports = router
