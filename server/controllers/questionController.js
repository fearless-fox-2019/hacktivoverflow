const questionModel = require('../models/questionModel')
const tagModel = require('../models/tagModel')
const CronJob = require('cron').CronJob
const sendEmail = require('../helpers/nodemialer')

new CronJob('00 00 1 * *', function () {
// new CronJob('* * * * * ', function () {
  questionModel
    .find()
    .populate('userId')
    .sort({totalVote: -1})
    .then(allquestion => {
      console.log(allquestion)
      let topQuestion = allquestion[0]
      let bodyEmail = `
        <h1> Hello @${topQuestion.userId.username}</h1>
        <h3>your question has been chosen as question of the month</h3>
        <br>
        <p>thankyou for make a question that usefull to other people :D we appraciate that, and we hope you keep post a question so other perople could learn from your question</p>
        <br>
        <br>
        <br>
        <p>sincerelly</p>
        <p>Hoverflow Team</p>
        `
        sendEmail(topQuestion.userId.email, bodyEmail)
    }).catch(err => console.log(err))
}, null, true, 'Asia/Jakarta')

class QuestionModel {
  static searchbytitle (req, res, next) {}
  static searchbytag (req, res, next) {
    console.log('-----===== disini di search by tag=====-----')
    let search = req.query.tag

    questionModel
      .find({
        tags: {
          $in: search
        }
      })
      .populate('userId', 'username email')
      .then(found => {
        console.log(found, 'tag found')
        res.status(200).json(found)
      }).catch(err => console.log(err))
  }
  static findAll (req, res, next) {
    questionModel
      .find()
      .populate('userId', '_id username email')
      .then(allquestion => {
        res.status(200).json(allquestion)
      }).catch(next)
  }
  static findOne (req, res, next) {
    let questionId = req.params.questionId

    questionModel
      .findById(questionId)
      .populate('userId', '_id username email')
      .populate({
        path: 'answers',
        populate: {
          path: 'userId'
        }
      })
      .then(question => {
        res.status(200).json(question)
      }).catch(next)
  }
  static create (req, res, next) {
    console.log('-----====== masuk question create =====-----')
    let {title, content, tags } = req.body
    let userId = req.logedUser._id

    tags = tags.split(',')
    tags = [... new Set(tags)]
    let newTag = []

    tags.forEach(element => {
      newTag.push({tagname: element})
    })
    let newQuestion = {title, content, tags, userId}
    let question
    // console.log(newQuestion)
    questionModel
      .create(newQuestion)
      .then(created => {
        // console.log(created)
        question = created
        return tagModel.insertMany(newTag)
      })
      .then(createdTag => {
        res.json(question)
      }).catch(next)
  }
  static update (req, res, next) {
    let questionId = req.params.questionId
    console.log(req.body)
    let { title, content, solved, tags} = req.body
    tags = tags.split(',')
    tags = [...new Set(tags)]
    let update = {}

    if (title) update.title = title
    if (content) update.content = content
    if (solved) update.solved = solved
    if (tags) update.tags = tags

    questionModel
      .findByIdAndUpdate(questionId, update, { new: true })
      .then(updated => {
        res.status(200).json(updated)
      }).catch(next)
  }
  static delete (req, res, next) {
    let questionId = req.params.questionId

    questionModel
      .findByIdAndDelete(questionId)
      .then(deleted => {
        return tagModel.deleteMany({
          tagname: {$in: deleted.tags}
        })
      })
      .then(tagsDeleted => {
        console.log(tagsDeleted)
        res.status(200).json({message: `question with id ${questionId} has been deleted`})
      }).catch(next)
  }
  static upvote (req, res, next) {
    console.log('-----===== masuk upvote =====-----')
    let questionId = req.params.questionId
    let userId = req.logedUser._id
    console.log(questionId, userId, '-=-==-=--=--=-=-=-=--=-=-=-')
    questionModel
      .findById(questionId)
      .then((question) => {
        if (question.upVote.indexOf(userId) >= 0) {
          // console.log(question,'question===============')
          return questionModel
            .findByIdAndUpdate((questionId), {
              $pull: {
                upVote: userId
              }
            }, {
              new: true,
              upsert: true
            })
        } else if (question.downVote.includes(userId)) {
          // console.log('ehhhh gamasuuukk')
          // console.log('ada dibawah')
          return questionModel
            .findByIdAndUpdate((questionId), {
              $pull: {
                downVote: userId
              },
              $push: {
                upVote: userId
              }
            }, {
              new: true,
              upsert: true
            })
        } else {
          // console.log('atas bawah gak ada cuyy')
          return questionModel
            .findByIdAndUpdate((questionId), {
              $push: {
                upVote: userId
              }
            }, {
              new: true,
              upsert: true
            })
        }
      })
      .then((voted) => {
        console.log(voted)
        let totalVote = voted.upVote.length - voted.downVote.length
        console.log(totalVote)
        return questionModel
        .findByIdAndUpdate(voted._id,{
          totalVote 
        },{
          new: true
        })
      })
      .then((updatedAgain)=> {
        // console.log(updatedAgain)
        res.status(200).json(updatedAgain)
      }) .catch(next)
  }
  static donwvote (req, res, next) {
    let questionId = req.params.questionId
    let userId = req.logedUser._id

    questionModel
      .findById(questionId)
      .then((question) => {
        if (question.downVote.includes(userId)) {
          return questionModel
            .findByIdAndUpdate(questionId, {
              $pull: {
                downVote: userId
              }
            }, {
              new: true,
              upsert: true
            })
        } else if (question.upVote.includes(userId)) {
          return questionModel
            .findByIdAndUpdate(questionId, {
              $pull: {
                upVote: userId
              },
              $push: {
                downVote: userId
              }
            }, {
              new: true,
              upsert: true
            })
        } else {
          return questionModel
            .findByIdAndUpdate(questionId, {
              $push: {
                downVote: userId
              }
            }, {
              new: true,
              upsert: true
            })
        }
      })
      .then((updated) => {
        console.log(updated)
        updated.totalVote = updated.upVote.length - updated.downVote.length
        res.status(200).json(updated)
      }).catch(next)
  }
}

module.exports = QuestionModel
