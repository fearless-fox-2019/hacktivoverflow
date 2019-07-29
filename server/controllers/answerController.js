const answerModel = require('../models/answerModel')
const questionModel = require('../models/questionModel')

class AnswerModel {
  static findAll (req, res, next) {
    console.log('--== masuk answer findall by quuestion id ==--')
    let questionId = req.params.questionId

    answerModel
      .find({
        questionId: questionId
      })
      .then((allAnswers) => {
        console.log(allAnswers)
        res.status(200).json(allAnswers)
      }).catch(next)
  }
  static create (req, res, next) {
    console.log('--== masuk answer create ==--')
    let newAnswer = {
      answer: req.bocy.answer,
      userId: req.logedUser._id,
      questionId: req.params.questionId
    }
    let answer = ''

    answerModel
      .create(newAnswer)
      .then(created => {
          return questionModel
                    .findByIdAndUpdate(questionId,{
                        $push: {
                            answer: created._id
                        }
                    })
      })
      .then(updatedquestion => {
          res.status(200).json({
              answer: answer,
              question: updatedquestion
          })
      }).catch(next)
  }
  static update (req, res, next) {
    let { answer } = req.body
    let answerId = req.params.answerId

    answerModel
      .findByIdAndUpdate(answerId, { answer}, { new: true })
      .then(updated => {
          res.status( 200 ).json( updated )
      }) .catch(next)
  }
  static delete (req, res, next) {
      let answerId = req.params.answerId

      answerModel
        .findByIdAndUpdate( answerId )
        .then(deleted => {
            res.status(200).json(deleted)
        })
  }
  static upvote (req, res, next) {
    let answerId = req.body.answerId
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
                        new: true
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
                        new: true
                    })
            } else {
                return answerModel
                    .findByIdAndUpdate(answerId, {
                        $push: {
                            upVote: userId
                        }
                    }, {
                        new: true
                    })
            }
        })
        .then((updated) => {
            console.log(updated)
            res.status(200).json(updated)
        }) .catch(next)
  }
  static donwvote (req, res, next) {
    let answerId = req.body.answerId
    let userId = req.logedUser._id

    answerModel
        .findById(answerId)
        .then((foundAnswer) => {
            if (foundAnswer.downVote.includes(userId)) {
                return answerModel
                    .findByIdAndUpdate(answerId, {
                        $pull: {
                            downVote: userId
                        }
                    }, {
                        new: true
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
                        new: true
                    })
            } else {
                return answerModel
                    .findByIdAndUpdate(answerId, {
                        $push: {
                            downVote: userId
                        }
                    }, {
                        new: true
                    })
            }
        })
        .then((updated) => {
            console.log(updated)
            res.status(200).json(updated)
        }) .catch(next)
  }
}

module.exports = AnswerModel
