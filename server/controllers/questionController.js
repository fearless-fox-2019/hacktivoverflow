const Question = require('../models/question.js')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

class QuestionController{
    static createQuestion(req, res, next){
        console.log(req.decoded.id, "ini decoded id");
        
        console.log("masuk contoller create");
        const {title, question, tags} = req.body
        let splittedTags = tags.split(',')
        console.log(splittedTags, "spliiteddddddd");
        
        console.log(title, question, "dari req body");
        let newQuestion = {title, question, tags : splittedTags, UserId : req.decoded.id}
        console.log(newQuestion);
        Question.create(newQuestion)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)

    }

    static getAllQuestion(req, res, next){
        let field = {}
        if(req.query.tags){
            // console.log("triggered heereeeeeee");
            field.tags = {$in : req.query.tags}
        } else if(req.query.search){
            field.title = { $regex: '.*' + req.query.search + '.*' }
        }
        
        Question.find(field).sort({createdAt : -1}).limit(30).populate('UserId')
            .then(data => {
                console.log(data, "inijkascjdcs");       
                res.status(200).json(data)
            })
            .catch(next)

    }

    static getOneQuestion(req, res, next){
        console.log("trigerred get one question");
        console.log(req.params.id);
        
        Question.findById(req.params.id).populate('UserId')
        .then(data => {
            console.log("founded");
            console.log(data);
            res.status(200).json(data)
        })
        .catch(next)
    }

    static deleteQuestion(req, res, next){
        console.log("triggered delete question controller");
        console.log(req.params.id);
        
        Question.findByIdAndDelete(req.params.id)
        .then(data => {
            console.log(data, "success deete");
            
            res.status(200).json({
                data, message : `Success deleted`
            })
        })
        .catch(next)
    }

    static updateQuestion(req, res, next){
        console.log("triggered update question controller");
        console.log("masuk controller update");
        console.log(req.params.id, "paramszzzzz");
        
        
        let updateQuestion = {}
        console.log(req.body);
        let splittedTags = req.body.tags
        req.body.title && (updateQuestion.title = req.body.title)
        req.body.question && (updateQuestion.question = req.body.question)
        req.body.tags && (updateQuestion.tags = splittedTags)
        Question.findByIdAndUpdate(req.params.id, updateQuestion, { new : true })
        .then(found => {
            console.log("berhasil update");
            res.status(200).json(found)
        })
        .catch(next)
    }

    static patchUpdate(req, res, next){
        console.log("triggered to patch update");
        if(req.body.type == 'upvote'){
            console.log(req.params.id, "ini params yuhuhuhuhuhuhhu");
            Question.findByIdAndUpdate(req.params.id, {$inc : {upvote : 1}}, {new : true})
            .then(found => {
                console.log(found, "hasil patch");
                res.status(200).json(found)
            })
            .catch(next)
        } else if(req.body.type ==  'downvote'){
            Question.findByIdAndUpdate(req.params.id, {$inc : {downvote : 1}}, {new:true})
            .then(found => {
                console.log(found, "hasil patch downvote");
                res.status(200).json(found)
            })
            .catch(next)
        }
    }

    static upVote(req, res, next){
        console.log("triggered upvote");
        console.log(req.decoded.id, "ini id userrrrrrrr");
        // {category : {$in : req.query.search}}
        Question.findById(req.params.id)
        .then(data => {
            if(data){
                console.log("ada gakbisa upvote");
                console.log(data);
                console.log(data.upvote.includes(req.decoded.id));
                
                console.log(data.upvote, "ini isi upvote")
                if(data.upvote.includes(req.decoded.id) == true){
                    console.log("triggered");
                    
                    Question.updateOne({_id : req.params.id}, {$pull : {upvote : req.decoded.id}})
                    .then(data => {
                        console.log(data, "ke pull");
                        
                        res.status(200).json(data)
                    })
                    .catch(next)
                } else {
                    console.log("truggered");
                    Question.updateOne({_id : req.params.id}, {$push : {upvote : req.decoded.id}})
                    .then(data => {
                        console.log("kepushhhh");
                        console.log(data);
                        
                        res.status(200).json(data)
                    })
                    .catch(next)
                }
            } else {
               throw {
                   code : 404
               }
            }
        })
        .catch(next)
    }

    static downVote(req, res, next){
        console.log("triggered downvote");
        console.log(req.decoded.id);
        Question.findById(req.params.id)
        .then(data => {
            console.log(data.downvote);
            console.log(data.downvote.includes(req.decoded.id));
            
            if(data.downvote.includes(req.decoded.id)){
                Question.updateOne({_id : req.params.id}, {$pull : {downvote : req.decoded.id}})
                .then(data => {
                    console.log(data);
                    res.status(200).json(data)
                })
            } else {
                Question.updateOne({_id : req.params.id}, {$push : {downvote : req.decoded.id}})
                .then(data => {
                    console.log(data);
                    res.status(200).json(data)
                })
            }
        })
        .catch(next)
    }
}

module.exports = QuestionController