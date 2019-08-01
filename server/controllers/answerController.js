const Question= require('../models/question')
const Answer= require('../models/answer')

class answerController{

    static create(req, res, next){
        let newAnswer= new Answer({
            title: req.body.title,
            description: req.body.description,
            upvotes: [],
            downvotes: [],
            userId: req.decode.id
        })
        let createdAnswer={}

        Promise.all([newAnswer.save(), Question.findById(req.body.questionId)])
        .then(([answer,question]) =>{
            createdAnswer= answer

            question.answers.push(answer._id)
            return question.save()
            
        })
        .then(success => {
            res.status(201).json(createdAnswer)
        })
        .catch(next)
    }

    static findAll(req, res, next){
        Answer.find({userId: req.decode.id}).populate('userId')
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        Answer.findById(req.params.id).populate('questionId')
        .then(answer =>{
            if(answer){
                res.status(200).json(answer)
            }else{
                throw ({code: 404, message: 'Answer not found!'})
            }
        })
        .catch(next)
    }

    static update(req, res, next){
        let updateValue={
            title: req.body.title,
            description: req.body.description
        }
        Answer.findByIdAndUpdate(req.params.id, updateValue)
        .then(answer=>{
            if(answer){
                res.status(200).json(answer)
            }else{
                throw {code: 404, message: 'Answer not found! '}
            }
        })
        .catch(next)
    }

    static updateUpvotes(req, res, next){
        let _id= req.params.id
        let userId= req.decode.id

        Answer.findById(_id)
        .then( answer =>{
            if(!answer){
                throw {code: 404, message: 'Answer not found!'}
            }else{
                if(answer.upvotes.includes(userId)){
                    return Answer.findByIdAndUpdate(_id , {$pull : { upvotes: userId }},{new: true})
                }else{
                    return Promise.all([
                                Answer.findByIdAndUpdate(_id, {$addToSet : { upvotes: userId }}),
                                Answer.findByIdAndUpdate(_id , {$pull : { downvotes: userId }})
                            ])
                    
                }
            }
        })
        .then(answer =>{
            res.status(200).json(answer[0])
        })
        .catch(next)
    }

    static updateDownvotes(req, res, next){
        let _id= req.params.id
        let userId= req.decode.id

        Answer.findById(_id)
        .then( answer =>{
            if(!answer){
                throw {code: 404, message: 'Answer not found!'}
            }else{
                if(answer.downvotes.includes(userId)){
                    return Answer.findByIdAndUpdate(_id , {$pull : { downvotes: userId }})
                }else{
                    return Promise.all([
                                Answer.findByIdAndUpdate(_id , {$addToSet : { downvotes: userId }}),
                                Answer.findByIdAndUpdate(_id , {$pull : { upvotes: userId }})
                            ])
                }
            }
        })
        .then(answer =>{
            res.status(200).json(answer[0])
        })
        .catch(next)
    }

    static remove(req, res, next){
        Answer.findByIdAndDelete(req.params.id)
        .then(answer =>{
            res.status(200).json(answer)
        })
        .catch(next)
    }
}

module.exports= answerController