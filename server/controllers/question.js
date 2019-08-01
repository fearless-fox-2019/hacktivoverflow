const Question = require('../models/question')

class QuestionController{
    static create(req, res, next){
        const UserId = req.decoded._id
        let data = {}
        req.body.title && (data.title = req.body.title)
        req.body.description && (data.description = req.body.description)
        data.tags = req.body.tags.split(', ')
        data.UserId = UserId
        Question.create(data)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(next)
    }
    static delete(req, res, next){
        const id = req.decoded._id
        console.log(id)
        Question.findById(req.params.id)
        .then(response => {
            if(id == response.UserId){
                return Question.findByIdAndRemove(req.params.id)
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(next)
    }
    //detail question
    static findOne(req, res, next){
        Question.findById(req.params.id)
        .then(data => {
            console.log(data, 'di ctrl')
            res.status(200).json(data)
        })
        .catch(next)
    }
    //landing page
    static getAll(req, res, next){
        Question.find()
        .populate('UserId')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    // summary user pernah question apa aja
    static getQuestionByUser(req, res, next){
        console.log('masuk by user')
        Question.find({UserId: req.params.userid}).populate('UserId')
        .then(response => {
            console.log('datanya : ', response)
            res.status(200).json(response)
        })
        .catch(next)
    }
    //up down votes
    static updownVotes(req, res, next){
        console.log('udah sampe controller votes nih')
        // nanti kirim status up atau down
        let data = {}
        req.params.id && (data.views = req.decoded._id)
        if(req.body.status === 'upvote') {
            req.params.id && (data.upvotes = req.decoded._id)
            Question.updateOne({_id: req.params.id}, {$push: data})
            .then(response => {
                console.log(response)
                return Question.updateOne({_id: req.params.id}, {$pull: {downvotes: req.decoded._id}})
            })
            .then(response2 => {
                res.status(200).json(response2)
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err.message)
            })
        }else if(req.body.status === 'downvote') {
            req.params.id && (data = {$pull: {upvotes: req.decoded._id}})
            Question.updateOne({_id: req.params.id}, data)
            .then(response => {
                return Question.updateOne({_id: req.params.id}, {$push: {downvotes: req.decoded._id}})
            })
            .then(response2 => {
                res.status(200).json(response2)
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err.message)
            })
        }else{
            Question.updateOne({_id: req.params.id}, data)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json(err)
                console.log(err.message)
            })
        }
        
    }
    //update question for user
    static update(req, res, next){
        let data = {}
        req.body.title && (data.title = req.body.title)
        req.body.description && (data.description = req.body.description)
        Question.findByIdAndUpdate(req.params.id, data)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
    }
    //my post
    static findByUser(req, res, next) {
        console.log(req.decoded._id)
        Question.find({UserId: req.decoded._id})
        .populate('userId')
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}

module.exports = QuestionController