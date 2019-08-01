const answerModel = require('../models/answerModel')
const questionModel = require('../models/questionModel')

class AnswerModel {
  static findAll (req, res, next) {
    console.log('-----===== masuk answer findall by quuestion id =====-----')
    let questionId = req.params.questionId
    console.log(questionId)
    answerModel
      .find({
        questionId: questionId
      })
      .populate('userId', 'username email')
      .then((allAnswers) => {
        console.log(allAnswers)
        res.status(200).json(allAnswers)
      }).catch(next)
  }
  static create (req, res, next) {
    console.log('-----===== masuk answer create =====-----')
    let newAnswer = {
      answer: req.body.answer,
      userId: req.logedUser._id,
      questionId: req.params.questionId
    }
    console.log(newAnswer)
    let answer

    answerModel
      .create(newAnswer)
      .then(created => {
        answer = created
        console.log(created,'ini created')
        return questionModel
          .findByIdAndUpdate(newAnswer.questionId, {
            $push: {
              answers: created._id
            }
          })
      })
      .then(updatedquestion => {
          console.log(updatedquestion,'ini di question')
        res.status(200).json({
          answer: answer,
          question: updatedquestion
        })
      }).catch(next)
  }
  static update (req, res, next) {
    console.log('-----===== masuk ke update answer =====-----')
    let { answer } = req.body
    let answerId = req.params.answerId

    answerModel
      .findByIdAndUpdate(answerId, { answer}, { new: true })
      .then(updated => {
        res.status(200).json(updated)
      }).catch(next)
  }
  static delete (req, res, next) {
    console.log('-----====== masuk delete answer =====-----')
    let answerId = req.params.answerId

    answerModel
      .findById(answerId)
      .then(found => {
        if (!found) {
          throw ({
            code: 404,
            message: `Answer id not found`
          })
        }else {
          return answerModel.findByIdAndDelete(answerId)
        }
      })
      .then(deleted => {
        res.status(200).json({message: `Successfully delete answer with id : ${deleted._id}`})
      }).catch(next)
  }
  static upvote (req, res, next) {
    console.log('-----===== masuk upvote answer =====-----')
    let answerId = req.params.answerId
    let userId = req.logedUser._id

    answerModel
      .findById(answerId)
      .then((answerFound) => {
        if (answerFound.upVote.includes(userId)) {
          return answerModel
            .findByIdAndUpdate(answerId, {
              $pull: {
                upVote: userId
              }
            }, {
              new: true,
              upsert: true
            })
        } else if (answerFound.downVote.includes(userId)) {
          return answerModel
            .findByIdAndUpdate(answerId, {
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
          return answerModel
            .findByIdAndUpdate(answerId, {
              $push: {
                upVote: userId
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
  static donwvote (req, res, next) {
    console.log('-----===== masuk downvote answer =====-----')
    let answerId = req.params.answerId
    let userId = req.logedUser._id

    answerModel
      .findById(answerId)
      .then((foundAnswer) => {
        console.log(foundAnswer, 'iniiiii')
        if (foundAnswer.downVote.includes(userId)) {
          return answerModel
            .findByIdAndUpdate(answerId, {
              $pull: {
                downVote: userId
              }
            }, {
              new: true,
            })
        } else if (foundAnswer.upVote.includes(userId)) {
          return answerModel
            .findByIdAndUpdate(answerId, {
              $pull: {
                upVote: userId
              },
              $push: {
                downVote: userId
              }
            }, {
              new: true,
            })
        } else {
          return answerModel
            .findByIdAndUpdate(answerId, {
              $push: {
                downVote: userId
              }
            }, {
              new: true,
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

module.exports = AnswerModel
