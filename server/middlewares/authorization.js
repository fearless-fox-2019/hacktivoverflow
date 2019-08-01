const Question = require('../models/question')
const Answer = require('../models/answer')

function authorizationQ(req, res, next) {
    Question.findById(req.params.questionid)
        .then((data) => {
            if (data.user_id == req.decoded.id) {
                next()
            }else{
                res.status(401).json({
                    message: " you are not authorized"
                })
            }
        })
        .catch(next)
}

function authorizationAns(req, res, next) {
    Answer.findById(req.params.answerid)
        .then((data) => {
            if (data.user_id == req.decoded.id) {
                next()
            }else{
                res.status(401).json({
                    message: " you are not authorized"
                })
            }
        })
        .catch(next)
}
module.exports = { authorizationQ, authorizationAns }