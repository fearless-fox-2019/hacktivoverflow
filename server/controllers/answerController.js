const Answer = require('../models/answer.js')
const Question = require('../models/question.js')
const mailer = require('../helpers/mailer.js').sendNotification


class AnswerController{
    static addAnswer(req, res, next){
        console.log("triggered add answer");
        console.log(req.body, "ini req body");
        console.log(req.decoded.id);
        const {title, content, QuestionId} = req.body
        let answerQuestion = {
            title,
            description : content,
            QuestionId, 
            UserId : req.decoded.id
        }
        Answer.create(answerQuestion)
        .then(data => {
            console.log(data, "success create");
            //mailer
            Question.findById(QuestionId).populate('UserId')
            .then(data => {
                console.log(data, "ini question yg di answer>?>?>?>?>?>?");
                let obj = {
                    name : `${data.UserId.firstname} ${data.UserId.lastname}`,
                    email : data.UserId.email,
                    titleQuestion : data.title,
                }
                mailer(obj)        
            })
            return data.populate('UserId').execPopulate()            
        })
        .then(newData => {
            res.status(201).json(newData)
        })
        .catch(next)
    }

    static getAnswer(req, res, next){
        console.log("triggered get answer");
        
        if(req.query.question){
            Answer.find({QuestionId : req.query.question}).populate('UserId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
        } else {
            Answer.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
        }
    }

    static upVoteAnswer(req, res, next){
        console.log("triggered upvote answer");
        Answer.findById(req.params.id)
        .then(data => {
            console.log(data.upVote);
            if(data.upVote.includes(req.decoded.id)){
                console.log("ada");
                Answer.updateOne({_id : req.params.id}, {$pull : {upVote : req.decoded.id}})
                .then(data => {
                    res.status(200).json(data)
                })
            } else {
                console.log("gak ada");
                Answer.updateOne({_id : req.params.id}, {$push : {upVote : req.decoded.id}})
                .then(data => {
                    res.status(200).json(data)
                })
            }
        })  
        .catch(next) 
    }

    static downVoteAnswer(req, res, next){
        console.log("triggered downvote answer");
        Answer.findById(req.params.id)
        .then(data => {
            console.log(data.downVote);
            if(data.downVote.includes(req.decoded.id)){
                console.log("ada");
                console.log("answer sheet");
                Answer.updateOne({_id : req.params.id}, {$pull : {downVote : req.decoded.id}})
                .then(data => {
                    res.status(200).json(data)
                })
            } else {
                console.log("gak ada");
                console.log("answer sheet");
                
                Answer.updateOne({_id : req.params.id}, {$push : {downVote : req.decoded.id}})
                .then(data => {
                    res.status(200).json(data)
                })
            }
        })
        .catch(next)
    }

    static getOneAnswer(req, res, next){
        console.log("triggered get one question");
        Answer.findById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteAnswer(req, res, next){
        console.log("triggered delete answer");
        console.log(req.params.id);
        
        Answer.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).json({
                data, message : 'success delete answer!'
            })
        })
        .catch(next)
    }
}

module.exports = AnswerController