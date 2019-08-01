const Question = require('../models/questions')

class QuestionController {
  static create(req,res,next) {
    // console.log(req.decoded) 
    Question.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.decoded._id,
      upVotes: [req.decoded._id]
      // downVotes: [] 
    })
      .then((dataCreated) => {
        res.status(201).json(dataCreated)
      })
      .catch(next)
  }

  static getAllQuestions(req,res,next) {
    Question.find().populate('userId').populate('answerId').sort({'createdAt': 'desc'})
      .then((dataFound) => {
        res.status(200).json(dataFound)
      })
      .catch(next)
  }

  static getQuestionByUser(req,res,next) {
    Question.find({userId: req.decoded._id}).populate('userId')
      .then((dataFound) => {
        res.status(200).json(dataFound)
      })
      .catch(next)
  }

  static upvote(req,res,next) {
    // console.log(req.params.id);
    Question.findById(req.params.id)
      .then((dataFound) => {
        console.log(dataFound)
        let found = dataFound.upVotes.filter((userId) => userId == req.decoded._id)
        if(found.length == 0) {
          dataFound.upVotes.push(req.decoded._id)
          // console.log(dataFound)  
          let index = dataFound.downVotes.findIndex((userId) => userId == req.decoded._id)
          if(index !== -1) {
            dataFound.downVotes.splice(index,1)
          }
          return dataFound.save()
        } else {
          let index = dataFound.upVotes.findIndex((userId) => userId == req.decoded._id)
          dataFound.upVotes.splice(index,1)
          return dataFound.save()
        }
      })
      .then((dataUpdated) => {
        // console.log(dataUpdated)
        res.status(200).json(dataUpdated)
      })
      .catch(next)
  }

  static downvote(req,res,next) {
    Question.findById(req.params.id)
      .then((dataFound) => {
        console.log(dataFound, 'data downvote ketemu')
        let found = dataFound.downVotes.filter((userId) => userId == req.decoded._id)
        console.log(found, 'ini found filter')
        if(found.length == 0) {
          dataFound.downVotes.push(req.decoded._id)
          // console.log(dataFound)  
          let index = dataFound.upVotes.findIndex((userId) => userId == req.decoded._id)
          console.log(index, 'ini index')
          if(index !== -1) {
            console.log('halooo masuk index')
            dataFound.upVotes.splice(index,1)
          }
          return dataFound.save()
        } else {
          let index = dataFound.downVotes.findIndex((userId) => userId == req.decoded._id)
          dataFound.downVotes.splice(index,1)
          return dataFound.save()
        }
      })
      .then((dataUpdated) => {
        console.log(dataUpdated)
        res.status(200).json(dataUpdated)
      })
      .catch(next)
  }

  static questionDetail(req,res,next) {
    Question.findById(req.params.id).populate('userId')
      .then((dataFound) => {
        res.status(200).json(dataFound)
      })
      .catch(next)
  }

  static questionUpdate(req,res,next) {
    Question.findById(req.params.id)
      .then((dataFound) => {
        dataFound.title = req.body.title
        dataFound.content = req.body.content
        return dataFound.save()
      })
      .then((updatedData) => {
        res.status(200).json(updatedData)
      })
      .catch(next)
  }
  
  static delete(req,res,next) {
    Question.findByIdAndDelete(req.params.id)
      .then((dataFound) => {
        // console.log('asd')
        res.status(200).json(dataFound)
      })
      .catch(next)
  }

  static findHighestVote(req,res,next) {
    // console.log('masudk gnak')
    Question.aggregate(
      [
          { "$project": {
              "title": 1,
              "content": 1,
              "userId": 1,
              "answerId": 1,
              "upVotes": 1,
              "downVotes": 1,
              "length": { "$size": "$upVotes" }
          }},
          { "$sort": { "length": -1 } },
          { "$limit": 3 }
      ],
      function(err,results) {
        if(err) {
          console.log(err)
        } else {
          res.status(200).json(results)
        }
      })
  }
}

module.exports = QuestionController