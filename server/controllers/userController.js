const User = require('../models/user')
const comparePassword = require('../helpers/comparePassword')
const jwtToken = require('../helpers/jwtToken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const sendEmail = require('../helpers/mail')
var cron = require('node-cron');

class UserController {

    static register(req, res, next){
        let data = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        }
        User.create(data)
        .then(data => {            
            res.status(201).json(data)
        })
        .catch(next)
    }

    static login(req, res, next){
        let userData = {
            email : req.body.email,
            password : req.body.password
        }

        User.findOne({email : userData.email})
        .then(data => {
            if(!data){
                next({status : 404, message: 'email/password invalid'})
            }
            else{
                let check = comparePassword(userData.password, data.password)
                // console.log(data.password)
                console.log(check)
                if(check){                    
                    let token = jwtToken(data)                    
                    res.status(200).json({token, id: data._id})
                }
                else {
                    next({status : 404, message: 'email/password invalid'})
                }
            }
        })
        .catch(next)
    }

    static turnOn(req, res,  next){
        console.log('corn activated')
        cron.schedule('0 0 * * 1,3,5', () => {
          User.find()
          .then(data => {
            console.log(data)
            let emails = []
            for(let i = 0; i < data.length; i++){
              emails.push(data[i].email)
            }
            sendEmail(emails)        
          })
          .catch(next)
          });
      }
   
}

module.exports = UserController