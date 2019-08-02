const answerRoute = require("express").Router(),
  answerController = require("../controllers/answer");

answerRoute.get("/", answerController.findAll);
answerRoute.post("/", answerController.create);
answerRoute.put("/:answerId", answerController);
answerRoute.patch("/:answerId", answerController);
answerRoute.delete("/:answerId", answerController);

module.exports = answerRoute;
