const Post = require('../models/post')

module.exports = {
  authorization (req, res, next){
    console.log('masuk authorization')
    Post.findById(req.params.id)
    .then((Post)=>{
      if (Post.userId == req.user.id){
        next()
      }
      else {
        throw {status: 400, message: "Unauthorized"}
      }
    })
    .catch(next)
  }
}