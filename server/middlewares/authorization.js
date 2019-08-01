const Post = require('../models/post')
module.exports = function authorization(req, res, next) {
    // console.log(req.decoded, "==============")
    // console.log('ashiap masuk authorization')
    // console.log(req.decoded.id)
    Post.findOne({ UserId : req.decoded.id })
    .then(data => {
        console.log(data)
        if(data){
            next()
        } else {
            next({status : 403, message : 'Unauthorized'})
        }
    })
    .catch(next)
}