const jwt = require('jsonwebtoken')
const Question = require('../models/question')
module.exports = (req, res, next) => {
    console.log('halo')
    Question.findById(req.params.id)
        // res.json(req.params)
        .then(question => {
            // res.json(user)
            console.log(question)

            if (question) {
                // console.log(req.user.id)
                // console.log(user.UserId)
                console.log(question.ownerQuestion)
                console.log(req.headers.decoded._id)
                if (question.ownerQuestion == req.headers.decoded._id) {
                    console.log('halo')
                    next()
                } else {
                    next({ status: 403, message: 'not authorize' })
                }
            } else {
                next({ status: 403, message: 'not authorize' })
            }
        })
}