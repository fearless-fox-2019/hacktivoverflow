const {verifyToken} = require('../helpers/jwt')
const Questions = require('../models/questions')

function authorization(req,res,next) {
    Questions.findById(req.params.id)
        .then((Questions => {
            if(Questions) {
                if(Questions.userId == req.decoded._id) {
                    next()
                } else {
                    throw {status:403, message:'Unauthorized'}
                }
            } else {
                throw {status:404, message: 'Questions not found'}
            }
        }))
        .catch(next)
}

module.exports = authorization