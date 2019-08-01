const router = require("express").Router();
const authRoute = require("./auth");
const questionRoute = require("./question");
const answerRoute = require("./answer");

router.get("/", (req, res) => {
    res.send("router OK");
});

router.use("/auth", authRoute);
router.use("/questions", questionRoute);
router.use("/answers", answerRoute);

module.exports = router;