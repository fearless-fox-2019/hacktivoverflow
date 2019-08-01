const User = require('../models/user')
const Post = require('../models/post')
const nodemailer = require("nodemailer");
const { decrypt } = require("../helpers/bcryptjs")
const { sign } = require("../helpers/jwt")

class UserController {
    static signIn(req, res, next) {
        if (req.body.email && req.body.password) {
            let signInItem = {
                email : req.body.email,
                password : req.body.password
            }
            User.findOne({ email: signInItem.email })
            .then(user => {
                if (!user) {
                    next({ code: 404, resource: "User" })
                } else {
                    let checkPassword = decrypt(signInItem.password, user.password)
                    if (checkPassword) {
                        let payload = {
                          id: user._id,
                          name: user.name,
                          email: user.email
                        }
                        let token = sign(payload)
                        res.status(200).json({ access_token: token, name: payload.name, id: payload.id })
                    } else {
                        next({ code: 400, message: "Invalid email / password" })
                    }
                }
            })
            .catch(next);
        } else if (!req.body.email) {
            next({ code: 400, message: 'Please input an email' })   
        } else if (!req.body.password) {
            next({ code: 400, message: 'Please input a password' })   
        }
    }

    static signUp(req, res, next) {        
        let newUser = {
            name : req.body.name,
            email: req.body.email,
            password: req.body.password,
            watchedTags: []
        }
        User.create(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(next)
    }

    static saveTag(req, res, next) {
        User.findById(req.decoded.id)
        .then(data => {
            if (!data) next({ code: 404, resource: "User" })
                else {
                    if (data.watchedTags.includes(req.body.tag)) {
                        next({ code: 400, message: 'Tag already watched' })
                    } else {
                        let tag = data.watchedTags
                        tag.push(req.body.tag)
                        let obj = {
                            watchedTags : tag
                        }
                        User.findByIdAndUpdate(data._id, obj, {new: true})
                        .then(data => {
                            res.status(200).json(data)
                        })
                        .catch(next)
                    }
                }
        })
        .catch(next)
    }

    static deleteTag(req, res, next) {
        User.findById(req.decoded.id)
        .then(data => {
            if (!data) next({ code: 404, resource: "User" })
                else {
                    let tag = data.watchedTags
                    tag.splice(req.body.index, 1)
                    let obj = {
                        watchedTags : tag
                    }
                    User.findByIdAndUpdate(data._id, obj, {new: true})
                    .then(data => {
                        res.status(200).json(data)
                    })
                    .catch(next)
                }
        })
    }

    static findUser(req, res, next) {
        User.findById(req.decoded.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

const CronJob = require('cron').CronJob;
new CronJob('50 11 * * 1', function() {
    let today  = new Date()
    let weekAgo = new Date()
    weekAgo.setDate(today.getDate() - 7)
    Post.find({ createdAt: { '$gte': weekAgo, '$lte': today } }).populate('userId')
    .then(data => {
        let obj = {}
        let post = 0
        let userId = ''
        for (let i = 0; i < data.length; i++) {
            if(!obj[data[i].userId._id]) {
                obj[data[i].userId._id] = []
            }
            obj[data[i].userId._id].push(data[i])
            post = obj[data[i].userId._id].length
            userId = data[i].userId._id
        }
        // console.log(post, userId)
        User.findById(userId)
        .then(user => {
            if (!user) next({ message: 'Todo Not Found' })
                else {
                    const transporter = nodemailer.createTransport ({
                        service: 'gmail',
                        auth: {
                            user: `fancy.todo7@gmail.com`,
                            pass: `hacktiv8`
                        }
                    })
        
                    const emailCont = `
                    <h2> HacktivOverflow </h2>
                    <hr>
                    <h2> Hi, ${user.name}... </h2>
                    <br>
                    <h3> This is your weekly summary in overflow.mooless.me </h3>
                    <br>
                    <h3> This week you post ${post} times. </h3>`
        
                    let emailDestination = user.email
        
                    const mailOptions = {
                        from: 'admin@todolist.com', // sender address
                        to: emailDestination, // list of receivers
                        subject: 'Weekly Summary from overflow.mooless.me', // Subject line
                        html: emailCont
                    };
            
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err){
                            console.log(err);
                        } else {
                            console.log(info);
                        }
                    })
                }
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
}, null, true, 'Asia/Jakarta');

module.exports = UserController