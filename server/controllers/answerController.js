const { answerModel , questionModel , userModel } = require("../models")

class AnswerController {
  static create(req, res, next) {
    const { description , questionId } = req.body
    const userId = req.decoded._id
    let answer
    answerModel.create({
      description,
      userId,
      questionId
    })
      .then(function (data) {
        answer = data
        return questionModel.updateOne({_id : questionId},{ $push: { answers: data } })
      })
      .then(function(data){
        res.status(200).json({
          answer,
          msg : 'success create answer'
        })
      })
      .catch(next)
  }

  static upVote(req, res, next) {
    let user
    userModel.findById(req.decoded._id)
      .then(dataUser => {
        if (!dataUser) {
          throw 'No User'
        } else {
          user = dataUser
          return answerModel.findById(req.body.id)
        }
      })
      .then(function (dataAnswer) {
        let found = dataAnswer.upvotes.find(el => {
          if (el.toString() == user._id) {
            return el
          }
        })
        let foundDown = dataAnswer.downvotes.find(el => {
          if (el.toString() == user._id) {
            return el
          }
        })

        if (!found) {
          if (foundDown) {
            dataAnswer.downvotes = dataAnswer.downvotes.filter(el => {
              if (el.toString() != user._id) {
                return el
              }
            })
          }
          dataAnswer.upvotes.push(user)
          return dataAnswer.save()
        }
        else {
          dataAnswer.upvotes = dataAnswer.upvotes.filter(el => {
            if (el.toString() != user._id) {
              return el
            }
          })
          return dataAnswer.save()
        }
      })
      .then(function (data) {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }

  static downVote(req, res, next) {
    let user
    userModel.findById(req.decoded._id)
      .then(dataUser => {
        if (!dataUser) {
          throw 'No User'
        } else {
          user = dataUser
          return answerModel.findById(req.body.id)
        }
      })
      .then((dataAnswer) => {
        let found = dataAnswer.downvotes.findIndex(el => el.toString() == user._id)

        let foundUp = dataAnswer.upvotes.find(el => {
          if (el.toString() == user._id) {
            return el
          }
        })

        if (found == -1) {
          if (foundUp) {
            dataAnswer.upvotes = dataAnswer.upvotes.filter(el => {
              if (el.toString() != user._id) {
                return el
              }
            })
          }
          dataAnswer.downvotes.push(user)
          return dataAnswer.save()
        }
        else {
          dataAnswer.downvotes = dataAnswer.downvotes.filter(el => {
            if (el.toString() != user._id) {
              return el
            }
          })
          return dataAnswer.save()
        }
      })
      .then(function (data) {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }

  static read(req, res, next) {
    answerModel.find().populate({ path: 'userId' }).populate({path : 'questionId'}).sort([['updatedAt', 'descending']])
      .then(function (data) {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    answerModel.update({ _id: req.params.id }, req.body)
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil update'
        })
      })
      .catch(next)
  }
}

module.exports = AnswerController