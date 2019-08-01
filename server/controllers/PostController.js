const Post = require('../models/post')
const User = require('../models/user')
const Answer = require('../models/answer')

class PostController {
  static create (req, res, next){
    let {title,content} = req.body
    let input = {title,content}
    input.userId = req.user.id

    Post.create(input)
      .then((Post)=>{
        res.status(201).json(Post)
      })
      .catch(next)
  }

  static findUserPosts (req, res, next){
    Post.find({
      userId : req.user.id
    })
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch(next)
  }

  static findAll (req, res, next){
    Post.find().populate('answerId')
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch(next)
  }

  static delete  (req, res, next){
    Post.deleteOne({
      _id : req.params.id
    })
      .then((data)=>{
          res.status(200).json(data)
      })
      .catch(next)
  }

  static findOne(req, res, next){
    Post.findOne({
      _id : req.params.id
    }).populate('answerId')
      .then((data)=>{
        res.status(200).json(data)
      })
      .catch(next)
  }

  static update(req, res, next){
    let {title,content} = req.body
    let input = {title,content}
    // console.log('ini update', input)
    Post.updateOne({_id: req.params.id}, input)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch(next)
  }

  static downvotes(req, res, next){
    let flag = true;
    let notFound = true;

    Post.findOne({
      _id: req.params.id
    })
      .then((post)=>{
        for (let i=0; i<post.downvote.length; i++){
          if (`${post.downvote[i]}` === `${req.user.id}`){
            res.status(200).json('Cannot downvote')
            flag = false
          }
        }
        for (let i=0; i<post.upvote.length; i++){
          if (`${post.upvote[i]}` === `${req.user.id}`){
            post.upvote.splice(i, 1)
            notFound = false;
            return post.save()
          }
        }
        if (flag && notFound){
          post.downvote.push(req.user.id)
        }
        return post.save()
      })
      .then((result)=>{
        res.status(200).json(result)
      })
      .catch(next)
  }

  static upvotes(req,res,next){
    
    let flag = true;
    let notFound = true;

    Post.findOne({
      _id: req.params.id
    })
      .then((post)=>{
        for (let i=0; i<post.upvote.length; i++){
          if (`${post.upvote[i]}` === `${req.user.id}`){
            res.status(200).json('Cannot Upvote')
            flag = false
          }
        }
        for (let i=0; i<post.downvote.length; i++){
          if (`${post.downvote[i]}` === `${req.user.id}`){
            post.downvote.splice(i, 1)
            notFound = false;
            return post.save()
          }
        }
        if (flag && notFound){
          post.upvote.push(req.user.id)
        }
        return post.save()
      })
      .then((result)=>{
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = PostController