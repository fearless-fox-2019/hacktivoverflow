const {verifyToken} = require('../helpers/jwt')
const Answer = require('../models/answers')

function authorization(req,res,next) {
    Answer.findById(req.params.id)
        .then((Answer => {
            if(Answer) {
                if(Answer.userId == req.decoded._id) {
                    next()
                } else {
                    throw {status:403, message:'Unauthorized'}
                }
            } else {
                throw {status:404, message: 'Answer not found'}
            }
        }))
        .catch(next)
}

module.exports = authorization