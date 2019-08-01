const { questionModel, userModel , answerModel } = require("../models")

class QuestionController {
  static create(req, res, next) {
    const { title, description } = req.body
    const userId = req.decoded._id
    questionModel.create({
      title,
      description,
      userId
    })
      .then(function (data) {
        res.status(201).json({
          data,
          msg: 'berhasil create'
        })
      })
      .catch(next)
  }

  static read(req, res, next) {
    req.query.title = new RegExp(req.query.title)
    questionModel.find(req.query).populate({ path: 'userId' }).populate({ path: 'answers' }).sort([['updatedAt', 'descending']])
      .then(function (data) {
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }

  static update(req, res, next) {
    questionModel.update({ _id: req.params.id }, req.body)
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil update'
        })
      })
      .catch(next)
  }

  static delete(req, res, next) {
    questionModel.deleteOne({ _id: req.params.id })
      .then(function (data) {
       return res.status(200).json({
          data,
          msg: 'berhasil delete'
        })
      })
      .then(data =>{
       return answerModel.deleteMany({questionId : req.params.id})
      })
      .then(data =>{
        console.log(data)
        res.status(200).json({
          data,
          msg : 'berhasil delete answers'
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
          return questionModel.findById(req.params.id)
        }
      })
      .then(function (dataQuestion) {
        let found = dataQuestion.upvotes.find(el => {
          if (el.toString() == user._id) {
            return el
          }
        })
        let foundDown = dataQuestion.downvotes.find(el => {
          if (el.toString() == user._id) {
            return el
          }
        })

        if (!found) {
          if (foundDown) {
            dataQuestion.downvotes = dataQuestion.downvotes.filter(el => {
              if (el.toString() != user._id) {
                return el
              }
            })
          }
          dataQuestion.upvotes.push(user)
          return dataQuestion.save()
        }
        else {
          dataQuestion.upvotes = dataQuestion.upvotes.filter(el => {
            if (el.toString() != user._id) {
              return el
            }
          })
          return dataQuestion.save()
        }
      })
      .then(function (data) {
         return questionModel.findById(data._id).populate({ path: 'userId' }).populate({ path: 'answers' })
      })
      .then(data =>{
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
          return questionModel.findById(req.params.id)
        }
      })
      .then((dataQuestion) => {
        let found = dataQuestion.downvotes.findIndex(el => el.toString() == user._id)

        let foundUp = dataQuestion.upvotes.find(el => {
          if (el.toString() == user._id) {
            return el
          }
        })

        if (found == -1) {
          if (foundUp) {
            dataQuestion.upvotes = dataQuestion.upvotes.filter(el => {
              if (el.toString() != user._id) {
                return el
              }
            })
          }
          dataQuestion.downvotes.push(user)
          return dataQuestion.save()
        }
        else {
          dataQuestion.downvotes = dataQuestion.downvotes.filter(el => {
            if (el.toString() != user._id) {
              return el
            }
          })
          return dataQuestion.save()
        }
      })
      .then(function (data) {
        return questionModel.findById(data._id).populate({ path: 'userId' }).populate({ path: 'answers' })
      })
      .then(data =>{
        res.status(200).json({
          data
        })
      })
      .catch(next)
  }
}

module.exports = QuestionController