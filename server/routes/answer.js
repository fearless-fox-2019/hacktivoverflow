const router = require("express").Router();
const auth = require("../middlewares/auth");
const AnswerController = require("../controllers/answer");

router.post("/", auth.authenticate, AnswerController.create);
router.put("/:id", auth.authenticate, auth.answerAuthorize, AnswerController.update);

router.get("/:questionId", AnswerController.findAll);

router.delete("/:id", auth.authenticate, auth.answerAuthorize, AnswerController.delete);

router.post("/vote/:id", auth.authenticate, AnswerController.vote);


module.exports = router;