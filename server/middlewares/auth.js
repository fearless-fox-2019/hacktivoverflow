const jwt = require('../helpers/jwt')
const User = require('../models/user')
const Post = require('../models/post')

module.exports = {
  Authentication(req, res, next) {
    if (req.headers.hasOwnProperty('access_token')) {
        req.decoded = jwt.decoded(req.headers.access_token)
        User.findOne({ username: req.decoded.username })
        .then(data => {
            if (!data) {
                next({status: 404, message: "username not found"})
            } else {
                next()
            }
        })
        .catch(next)
    } else {
        next({status: 403, message: "Forbidden page"})
    }
  },
    Authorization(req, res, next) {
        Post.findById(req.params.id)    
        .then((gotData)=>{
            if(gotData){
                if(gotData.userId == req.decoded.id){
                    next()
                } else {
                    next({code : 401, message : "Unauthorized"})
                }
            }
        })
        .catch(next)
    } 
} 