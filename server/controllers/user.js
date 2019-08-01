const User = require('../models/user')
const {getToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')
const transporter = require('../helpers/nodemailer')
const CronJob = require("cron").CronJob;

class UserController{
    static resgister(req, res, next){
        console.log(req.body)
        User.create(req.body)
        .then(response => {
            console.log(response)
            new CronJob(
                "0 12 5 4 4 ",
                function () {
                    const emailCont = `Hi ${response.username}!. Welcome to our website ⛅️🌎! (maaf ya kalo spamming) http://localhost:8080/`
                    const mailOptions = {
                        from: '<no-reply-hacktivoverflow@admin.com>',
                        to: `${response.email}`,
                        subject: 'Hacktiv Overflow Reminder',
                        html: emailCont
                    }

                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            console.log(err, 'error nodemailer');
                        } else {
                            console.log(info, 'success nodemailer');
                        }
                    })
                },
                null,
                true,
                "America/Los_Angeles"
            )
            res.status(201).json(response)
        })
        .catch(next)
    }
    static getAll(req, res, next){
        User.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(next)
    }
    static login(req, res, next){
        console.log('masuk controller login')
        // email & password => jwt
        const {email, password} = req.body
        User.findOne({email: email})
        .then(data => {
            if(data){
                if(comparePassword(data.password, password)){
                    const forJwt = {}
                    data._id && (forJwt._id = data._id)
                    data.email && (forJwt.email = data.email)
                    data.username && (forJwt.username = data.username)
                    data.image && (forJwt.image = data.image)
                    const token = getToken(forJwt)
                    res.status(200).json({
                        message: 'Valid',
                        data: {
                            id: data._id,
                            name: data.username,
                            email: data.email
                        },
                        jwt: token
                    })
                }else{
                    res.status(400).json({
                        message: 'Username/Password Invalid'
                    })
                }
            }else{
                res.status(400).json({
                    message: 'Username/Password Invalid'
                })
            }
        })
        .catch(next)
    }
    static update(req, res, next){
        let data = {}
        req.body.username && (data.username = req.body.username)
        req.body.email && (data.email = req.body.email)
        req.body.image && (data.image = req.body.image)
        User.findByIdAndUpdate(req.decoded._id, data)
        .then( data => {
            res.status(201).json(data)
        })
        .catch(next)
    }
}

module.exports = UserController