const Question = require('../models/question')
//belom diganti !!!
module.exports = (req, res, next) => {
    Question.findOne({
        UserId : req.decoded.id
    })
    .then(data => {
        if(data){
            if(data.UserId = req.decoded.id){
                next()
            } else {
                throw {
                    code : 401
                }
            }
        } else {
            throw {
                code : 404
            }
        }
    })
    .catch(next)
}