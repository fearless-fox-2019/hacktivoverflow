const User = require('../models/user')
const {sign} = require('../helpers/jwt.js')
const {comparePassword} = require('../helpers/bcrypt.js')

class UserController{
    static register(req, res, next){
        console.log("masuk sini register");
        
        const {firstname, lastname, birthday, email, password} = req.body
        const newUser = {
            firstname, lastname, birthday, email, password
        }
        User.create(newUser)
        .then(data => {
            let token = sign({
                id : data._id,
                email : data.email
            })
            res.status(201).json({
                data, token
            })
        })
        .catch(next)
    }

    static login(req, res, next){
        console.log("masuk controller login");
        
        const {email, password} = req.body
        User.findOne({email : email})
        .then(data => {
            if(data){
                if(comparePassword(password, data.password)){
                    let user = {
                        id : data._id,
                        email : data.email
                    }

                    let token = sign(user)
                    console.log("success login");
                    
                    res.status(200).json({data, token})
                } else {
                    throw {
                        code : 404,
                        message : 'Username / Password is wrong'
                    }
                }
            } else {
                throw {
                    code : 404,
                    message : 'Username / Password is wrong'
                }
            }
        })
        .catch(next)
    }

    static allUser(req, res, next){
        console.log("triggeredddddd");
        
        User.find({}).limit(30)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}
module.exports = UserController