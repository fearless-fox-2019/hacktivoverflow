require('dotenv').config()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

class userController{
    static signin(req, res){
        let {email, password} = req.body
        User.findOne({
            email:email
        })
        .then( (oneUser) =>{
            if (oneUser) {
                if (bcrypt.compareSync(password, oneUser.password)) {
                    let payload = oneUser
                    let token = jwt.sign({payload}, process.env.SECRET)
                    res.status(200).json({
                        data: oneUser,
                        token: token
                    })
                } else {
                    res.status(400).json({msg: 'password/email is wrong'})
                }
            } else {
                res.status(400).json({msg:'password/email is wrong'})
            }
        })
        .catch( (err) => {
            res.status(500).json(err)
        })
    }

    static signup(req, res){
        let newUserInfo = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUserInfo)
        .then( (newUser) =>{
            res.status(201).json(newUser)
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).json({error: err})
        })
    }

    static addTag(req, res){
        User.findByIdAndUpdate(req.params.id, {$push: {watchedTags: req.body.tag}}, {new: true})
        .then( (updated) => {
            res.status(200).json(updated)
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

    static findOne(req, res) {
        console.log('here')
        User.findById(req.params.id)
        .then( (user) => {
            res.status(200).json(user)
        })
        .catch( (err) => {
            console.log(err)
            res.status(500).json({
                error: err,
                message: 'Failed fetch user'
            })
        })
    }
}

module.exports= userController