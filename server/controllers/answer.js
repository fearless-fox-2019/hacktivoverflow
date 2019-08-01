const Answer = require('../models/answer')

class AnswerController{
    static create(req, res, next){
        console.log('masuk smape controller: ',  req.body)
        console.log('ini req decoded: ', req.decoded)
        const UserId = req.decoded._id
        let data = {}
        req.body.title && (data.title = req.body.title)
        req.body.description && (data.description = req.body.description)
        data.UserId = UserId
        data.QuestionId = req.params.questionid
        console.log('ini data yg kebuat: ', data)
        Answer.create(data)
        .then(response => {
            console.log('berhasil : ', response)
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
    //get answere by question
    static getAllByIdQuestion(req, res, next){
        Answer.find({QuestionId: req.params.id})
        .populate('UserId')
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    // get all ajah huhuhu ku sedih
    static getAll(req, res, next){
        Answer.find()
        .populate('QuestionId')
        .populate('UserId')
        .then( data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    // update answer with authorization
    static update(req, res, next){
        let data = {}
        req.body.title && (data.title = req.body.title)
        req.body.description && (data.description = req.body.description)
        req.body.upvotes && (data.upvotes = req.body.upvotes)
        req.body.downvotes && (data.downvotes = req.body.downvotes)
        Answer.findOneAndUpdate(req.params.id, data)
        .then( response => {
            res.status(200).json(response)
        })
        .catch( next)
    }
    static updateAnswerVote(req, res, next){
        let data = {}
        req.body.upvotes && (data.upvotes = req.params.id)
        req.body.downvotes && (data.downvotes = req.params.id)
        Answer.findOneAndUpdate(req.params.id, {$push: data})
        .then( response => {
            res.status(200).json(response)
        })
        .catch( next)
    }

}

module.exports = AnswerController