const { compare } = require('../helpers/bcryptjs'),
    User = require('../models/user'),
    jwt = require('jsonwebtoken')

module.exports = class userController {
    static signUp (req, res, next) {
        console.log(req.body)
        User.create(req.body)
            .then( data => res.status(201).json(data))
            .catch( err => next(err))
    }

    static signIn (req, res, next) {
        let payload
        User.findOne({ email: req.body.email })
            .then( data => {
                if(data){
                    if(compare(req.body.password, data.password)){
                        payload = {
                            id: data._id,
                            email: data.email,
                            username: data.username
                        }
                        console.log(data)
                        console.log(payload)
                        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
                        res.status(200).json({ accessToken: token, username: payload.username })
                    } else { throw { code: 400, message: 'Wrong email/password'} }


                } else { throw { code: 400, message: 'Wrong email/password'} }
            })
            .catch( err => next(err) )
    }
}