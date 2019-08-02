const questionRoute = require("express").Router(),
  questionController = require("../controllers/question");

questionRoute.get("/", questionController.findAll);
questionRoute.get("/:questionId", questionController.findOne);
questionRoute.post("/", questionController.create);
questionRoute.put("/:questionId", questionController);
questionRoute.patch("/:questionId", questionController);
questionRoute.delete("/:questionId", questionController);

module.exports = questionRoute;
