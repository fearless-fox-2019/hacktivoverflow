const express = require("express")
const router = express.Router()
const answerController = require("../controllers/answer-controller")
const authenticate = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorizationsAnswer')
router.get("/:id", answerController.findAll);
router.use(authenticate)
router.post("/upvote/:id", answerController.upVote)
router.post("/downvote/:id", answerController.downVote)
router.post("/:id", answerController.create);
router.put("/:id",authorization,answerController.update)
// router.delete("/:id",authorization,answerController.destroy)


module.exports = router