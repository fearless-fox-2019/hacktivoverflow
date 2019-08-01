const User = require('../models/User')
const Helper = require('../helpers/helper')

class UserController {
    static create(req, res){
        console.log(req.body);
        let {username, email, password} = req.body
        User.create({username, email, password})
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static login(req, res){
        User.findOne({
            email : req.body.email
        })
            .then(user => {
                if(user){
                    if(Helper.comparePassword(req.body.password, user.password)){
                        let access_token = Helper.generateJWT({
                            _id : user._id,
                            username : user.username,
                            email : user.email
                        })
                        // console.log('success login', access_token);
                        
                        res.json({access_token, userId : user._id})
                        
                    } else{
                        res.status(404).json({message : 'user not found'})   
                    }
                } else{
                    res.status(404).json({message : 'user not found'})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findById(req, res){
        User.findById(req.params.id)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static editTag(req, res){
        User.findByIdAndUpdate(req.params.id, {
            tags : req.body.tags
        })
            .then(data=> {
                res.json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
}

module.exports = UserController