const jwt = require('jsonwebtoken')
const Answer = require('../models/answer')
module.exports = (req, res, next) => {
    console.log('halo')
    Answer.findById(req.params.id)
        // res.json(req.params)
        .then(answer => {
            // res.json(user)
            console.log(answer)

            if (answer) {
                // console.log(req.user.id)
                // console.log(user.UserId)
                console.log(answer.answerer)
                console.log(req.headers.decoded._id)
                if (answer.answerer == req.headers.decoded._id) {
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