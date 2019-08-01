const { sign, verify } = require('../helpers/jwtoken')
const userModel = require('../models/userModel')
const questionModel = require('../models/questionModel')
const answerModel = require('../models/answerModel')

module.exports = {
    authentication: function (req, res, next) {
        let token = req.headers.token
        console.log(token)
        if (!token) {
            throw ({
                code: 400,
                message: `Unauthenticated`
            })
        } else {
            let decode = verify(token)
            userModel
                .findOne({
                    email: decode.email
                })
                .then((found) => {
                    let decode = verify(token)
                    req.decode = decode
                    req.logedUser = found
                    next()
                })
                .catch((err) => {
                    throw ({
                        code: 404,
                        message: `User not found`
                    })
                })
        }
    },
    question_authorization: function (req, res, next) {
        let questionId = req.params.questionId
        let userId = req.logedUser._id

        questionModel
            .findById(questionId)
            .then(found => {
                if(!found){
                    throw({
                        code: 404,
                        message: `Question with id ${questionId} is not found`
                    })
                }
                if(found.userId.toString() == userId.toString()){
                    console.log(found)
                    next()
                }
                else {
                    throw({
                        code: 400,
                        message: 'only creator can access'
                    })
                }
            }) .catch(next)
    },
    answer_authorization: function(req,res,next){
        let answerId = req.params.answerId
        let userId = req.logedUser._id

        answerModel
            .findById(answerId)
            .then(found => {
                console.log(found)
                if(!found){
                    throw({
                        code: 404,
                        message: `answer with id ${answerId} is not found`
                    })
                }
                if(found.userId.toString() == userId.toString()){
                    console.log(found)
                    next()
                }
                else {
                    throw({
                        code: 400,
                        message: 'only creator can access'
                    })
                }
            }) .catch(next)
    }
}