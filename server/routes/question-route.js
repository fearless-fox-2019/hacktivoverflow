const express = require("express")
const router = express.Router()
const questionController = require("../controllers/question-controller")
const images = require('../helpers/images')
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
router.post('/upload',
  images.multer.single('image'),
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })
router.use(cronJob)
// router.put("/stock/:id", questionController.updateStock)
router.delete("/:id", authorization, questionController.destroy)
router.put("/:id", authorization, questionController.update)
// router.post("/size", questionController.addSize)


module.exports = router