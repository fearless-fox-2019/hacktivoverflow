const Answer = require('../models/answer')

class AnswerController {

  static create(req, res, next){
    let newAnswer = {
      title : req.body.title,
      content : req.body.content,
      UserId : req.decoded.id,
      PostId : req.body.postId
    }
    Answer.create(newAnswer)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(next)
  }
   
  static findAll(req, res, next){
    console.log(req.body)
    Answer.find({ PostId : req.query.PostId }).sort({'createdAt' : 'desc'})
    .populate('UserId')
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(next)
  }

  static delete(req, res, next){
    Answer.deleteMany({ PostId : req.body.postId })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static upVote(req, res, next){
    Answer.findOne({ _id : req.params.id })
    .then(data => {
      console.log(req.decoded.id)
      let dataFilter = data.UpVote.filter(el => el == req.decoded.id)
      console.log(dataFilter.length, 'ini data filter')
      if(dataFilter.length > 0){        
        let idx = data.UpVote.findIndex(el => el == req.decoded.id)
        console.log(idx, 'ini idx upvote')
        data.UpVote.splice(idx, 1)
        return data.save()
      }
      else {
        data.UpVote.push(req.decoded.id)  
        console.log(req.decoded.id)      
        let userId = req.decoded.id
        let idx = data.DownVote.findIndex(el => el == userId)
        console.log(idx, 'ini idx')
        if(idx !== -1){
          data.DownVote.splice(idx, 1)
          return data.save()
        }
        else {
          return data.save()
        }
      }
      // return data
    })
    .then(save => {
      res.status(200).json(save)
    })
    .catch(next)
  }

  static updateContent(req, res, next){
    let newData = {
      title : req.body.title,
      content : req.body.content
    }
    Answer.updateOne({ _id : req.params.id }, newData)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
  }

  static downVote(req, res, next){
    Answer.findOne({ _id : req.params.id })
    .then(data => {     
      console.log(req.decoded.id)
      let dataFilter = data.DownVote.filter(el => el == req.decoded.id)
      console.log(dataFilter.length, 'ini data filter')
      if(dataFilter.length > 0){        
        let idx = data.DownVote.findIndex(el => el == req.decoded.id)
        console.log(idx, 'ini idx upvote')
        data.DownVote.splice(idx, 1)
        return data.save()
      }
      else {
        data.DownVote.push(req.decoded.id)  
        console.log(req.decoded.id)      
        let userId = req.decoded.id
        let idx = data.UpVote.findIndex(el => el == userId)
        console.log(idx, 'ini idx')
        if(idx !== -1){
          data.UpVote.splice(idx, 1)
          return data.save()
        }
        else {
          return data.save()
        }
      }
      // return data
    })
    .then(save => {
      res.status(200).json(save)
    })
    .catch(next)
  }
}

module.exports = AnswerController