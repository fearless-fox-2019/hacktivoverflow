const Answer = require('../models/answers')

class AnswerController {
  static create(req,res,next) {
    let input = {
      userId: req.decoded._id,
      title: req.body.title,
      content: req.body.content,
      questionId: req.body.questionId,
      upVotes: [req.decoded._id]
    }
    Answer.create(input)
      .then((dataCreated) => {
        // console.log(dataCreated); 
        res.status(201).json(dataCreated)
      })
      .catch(next)
  }

  static upVote(req,res,next) {
    Answer.findById(req.params.id)
      .then((dataFound) => {
        let found = dataFound.upVotes.filter(userId => userId == req.decoded._id)
        if(found.length == 0) {
          dataFound.upVotes.push(req.decoded._id)
          let index = dataFound.downVotes.findIndex((userId) => userId == req.decoded._id)
          if(index !== 1) {
            dataFound.downVotes.splice(index,1)
          }
          return dataFound.save()
        } else {
          throw {status: 400, message: 'you cannot like the same thing twice '}
        }
      })
      .then((dataUpdated) => {
        res.status(200).json(dataUpdated)
      })
  }

  static downVote(req,res,next) {
    Answer.findById(req.params.id)
    .then((dataFound) => {
      let found = dataFound.downVotes.filter(userId => userId == req.decoded._id)
      if(found.length == 0) {
        dataFound.downVotes.push(req.decoded._id)
        let index = dataFound.upVotes.findIndex((userId) => userId == req.decoded._id)
        if(index !== 1) {
          dataFound.upVotes.splice(index,1)
        }
        return dataFound.save()
      } else {
        throw {status: 400, message: 'you cannot like the same thing twice '}
      }
    })
    .then((dataUpdated) => {
      res.status(200).json(dataUpdated)
    })
  }

  static findAnswer(req,res,next) {
    Answer.find({questionId: req.body.questionId})
      .then(dataFound => {
        res.status(200).json(dataFound)
      })
      .catch(next)
  }
}

module.exports = AnswerController