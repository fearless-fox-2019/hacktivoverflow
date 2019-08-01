const Answer = require('../models/answer')
const Post = require('../models/post')

class AnswerController {
  static create (req, res, next){
    let {title, content} = req.body
    let input = {title, content}
    input.postId = req.params.id
    input.userId = req.user.id

    let answerId
    Answer.create(input)
      .then((answer)=>{

        answerId = answer._id
        return Post.findOne({
          _id : input.postId
        })
      })
      .then((post)=>{
        post.answerId.push(answerId)

        return post.save()
      })
      .then((result)=>{
        res.status(201).json(result)
      })
      .catch(next)
  }

  static findAllAnswer (req, res, next){
    Answer.find({
      postId : req.params.id
    })
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch(next)
  }

  // static findAll (req, res, next){
  //   Answer.find()
  //     .then((data)=>{
  //       res.status(200).json(data)
  //     })
  //     .catch(next)
  // }

  static delete  (req, res, next){
    Answer.deleteOne({
      _id : req.params.id
    })
      .then((data)=>{
          res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    Answer.findOne({
      _id : req.params.id
    })
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req, res, next){
    let {title,content} = req.body
    let input = {title,content}
    console.log('ini input', input)
    Answer.updateOne({_id: req.params.id}, input)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
  }
}

module.exports = AnswerController