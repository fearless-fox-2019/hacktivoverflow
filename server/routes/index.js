const indexRouter = require("express").Router(),
  users = require("./users"),
  answers = require("./answers"),
  questions = require("./questions");

indexRouter.use("/users", users);
indexRouter.use("/answers", answers);
indexRouter.use("/questions", questions);

module.exports = indexRouter;
