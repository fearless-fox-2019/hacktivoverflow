const router = require("express").Router();
const QuestionControlller = require("../controllers/question");
const auth = require("../middlewares/auth")

router.post("/", auth.authenticate, QuestionControlller.create);
router.put("/:id", auth.authenticate, auth.questionAuthorize, QuestionControlller.update);

router.get("/:id", QuestionControlller.findById);
router.get("/", QuestionControlller.findAll);

router.delete("/:id", auth.authenticate, auth.questionAuthorize, QuestionControlller.delete);

router.post("/vote/:id", auth.authenticate, QuestionControlller.vote);

module.exports = router;