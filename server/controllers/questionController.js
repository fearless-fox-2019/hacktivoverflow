const Question= require('../models/question')
const Answer= require('../models/answer')
const CronJob = require('cron').CronJob;

// Cron to delete question with votes value -250
// Runing every year at 31 Dec at 23.00
new CronJob('55 23 31 12 *', async () => {

    Question.find({})
    .then(questions => {
        let data= []
        questions.forEach(question => {
            let totalVote= question.upvotes.length - question.downvotes.length
            if(totalVote < -200) data.push(question._id)
        })
        console.log('ini datanya', data)
        if(data.length > 0){
            let promises=[]
            data.forEach(el =>{
                promises.push(Question.deleteOne({_id: el}))
            })

            return Promise.all(promises)
        }
    })
    .then(success =>{
        console.log('success delete data', success)
    })
    .catch(err => {
        console.log(err)
    })

}, null, true, 'Asia/Jakarta');

class questionController{

    static create(req, res, next){
        let tags= [...new Set(req.body.tags)]

        let newQuestion= new Question({
            title: req.body.title,
            description: req.body.description,
            upVotes: [],
            donwVotes: [],
            answers:[],
            tags:tags,
            userId: req.decode.id
        })

        newQuestion.save()
        .then(question=>{
            res.status(201).json(question)
        })
        .catch(next)
    }

    static findAll(req, res, next){
        let key={}
        
        if(req.query.title){
            key.title={ 
                $regex: req.query.title
            }
        }else if(req.query.tag){
            key.tags= {
                $in: req.query.tag
            }
        }

        Question.find(key).sort({createdAt: -1})
        .populate({
            path: 'userId',
            select: ['name','_id']
        })
        .populate({
            path: 'answers',
            populate:{
                path: 'userId',
                model: 'User',
                select: ['name','_id']
            }
        })
        .then(questions =>{
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static findMyPost(req, res, next){
        Question.find({userId: req.decode.id}).sort({createdAt: -1})
        .then(questions =>{
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        Question.findById(req.params.id)
        .populate({
            path: 'userId',
            select: ['name','_id']
        })
        .populate({
            path: 'answers',
            populate:{
                path: 'userId',
                model: 'User',
                select: ['name','_id']
            }
        })
        .then(question =>{
            if(question){
                res.status(200).json(question)
            }else{
                throw {code: 404, message: 'Question not found! '}
            }
        })
        .catch(next)
    }

    static update(req, res, next){
        let updateValue={
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags
        }
        Question.findByIdAndUpdate(req.params.id, updateValue)
        .then(question=>{
            if(question){
                res.status(200).json(question)
            }else{
                throw {code: 404, message: 'Question not found! '}
            }
        })
        .catch(next)
    }

    static updateUpvotes(req, res, next){
        let questionId= req.params.id
        let userId= req.decode.id

        Question.findById(questionId)
        .then(question =>{

            if(!question){
                throw {code: 404, message: 'Question not found'}
            }else{
                if(question.upvotes.includes(userId)){
                    return Question.findByIdAndUpdate(questionId , {$pull : { upvotes: userId }})
                }else{
                    // console.log(question.upvotes)
                return Promise.all([
                        Question.findByIdAndUpdate(questionId, {$addToSet : { upvotes: userId }}),
                        Question.findByIdAndUpdate(questionId , {$pull : { downvotes: userId }})
                    ])

                }
            }
        })
        .then(question =>{
            res.status(200).json(question[0])
        })
        .catch(next)

        

    }

    static updateDownvotes(req, res, next){
        let questionId= req.params.id
        let userId= req.decode.id

        Question.findById(questionId)
        .then(question =>{
            if(!question){
                throw {code: 404, message: 'Question not found!'}
            }else{
                if(question.downvotes.includes(userId)){
                    return Question.findByIdAndUpdate(questionId , {$pull : { downvotes: userId }})
                }else{
                    return Promise.all([
                                Question.findByIdAndUpdate(questionId , {$addToSet : { downvotes: userId }}),
                                Question.findByIdAndUpdate(questionId , {$pull : { upvotes: userId }})
                            ])

                }
            }
        })
        .then(question =>{
            res.status(200).json(question[0])
        })
        .catch(next)
        
        

    }

    static remove(req, res, next){
        
        Question.findById(req.params.id)
        .then(question => {
            return Promise.all([
                Answer.deleteMany({
                    _id: question.answers
                }),
                Question.findByIdAndDelete(req.params.id)
            ])
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)

        // Promise.all([
        //     Answer.deleteMany({ questionId : _id }),
        //     Question.findOneAndDelete({ _id })
        // ])
        // .then(data=>{
        //     res.status(200).json(data)
        // })
        // .catch(next)
    }

}

module.exports= questionController