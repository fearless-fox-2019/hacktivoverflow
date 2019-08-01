const User= require('../models/user')
const {compare}= require('../helpers/bcrypt')
const {generateToken}= require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class userController{

    static getUser(req, res, next){
        User.findById(req.decode.id)
        .then(user => {
            if(user){
                res.status(200).json(user)
            }else{
                throw {code: 404, message: 'User Not Found!'}
            }
        })
        .catch(next)
    }

    static register(req, res, next){
        console.log(req.body.userTags)
        let tags= [...new Set(req.body.userTags)]

        let newUser= new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            userTags: tags
        })
        
        newUser.save()
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(next)
        }
    
    static login(req, res, next){
            User.findOne({email: req.body.email})
            .then(user=>{
                if(user){
                    if(compare(req.body.password, user.password)){
                        let payload= {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                        }
    
                        let token= generateToken(payload)
    
                        res.status(200).json({
                            token,
                            tags: user.userTags,
                            userId: user._id,
                            name: user.name,
                        })
                    }else{
                        throw {code: 404, message: 'Wrong Email/Password'}
                    }
                }else{
                    throw {code: 404, message: 'Wrong Email/Password'}
                }
            })
            .catch(next)
        }

    static updateTag(req, res, next){
        let newTag= [...new Set(req.body.userTags)]
        User.findByIdAndUpdate(req.decode.id, {userTags: newTag})
        .then(user =>{
            if(user){
                res.status(200).json(user)
            }else{
                throw {code: 404, message: 'User Not Found!'}
            }
        })
        .catch(next)

    }


     static loginGoogle(req, res, next){
        
            client
            .verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
    
            .then(function(ticket){

                const { email, name } = ticket.getPayload()
    
                let password= name+'trail work55'
                let newUser= new User({
                    name: name,
                    email: email,
                    password: password,
                    userTags:[]
                })
    
                User.findOne({email: email})
                .then(user=>{
                    if(user){
                        console.log(user)
                        let payload= {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                        }
    
                        let token= generateToken(payload)
    
                        res.status(200).json({
                            token,
                            tags: user.userTags,
                            userId: user._id,
                            name: user.name,
                        })
    
                    }else{
                        User.create(newUser)
                        .then(user => {
                            let payload= {
                                id: user._id,
                                email: user.email,
                                name: user.name,
                            }
        
                            let token= generateToken(payload)
        
                            res.status(200).json({
                                token,
                                tags: user.userTags,
                                userId: user._id,
                                name: user.name,
                            })
                        })
                        .catch(next)  
                    }
                })
                .catch(next)
            })
            .catch(next)
        }
}

module.exports= userController