const Question = require('../models/Question')
const Answer = require('../models/Answer')
var CronJob = require('cron').CronJob;
const sendEmail = require('../helpers/nodemailer')
const kue = require('kue')
let queue = kue.createQueue();
let text;

new CronJob(' 56 23 * * *', function() {

    Question.find({})
        .populate('answers')
        .populate('userId')
        .then(questions => {
            
            questions.forEach(question => {
                if(question.answers.length > 0){
                    question.answers.forEach(answer => {
                        let createAnswerDate = new Date(answer.createdAt)
                        if(new Date().toLocaleDateString() === createAnswerDate.toLocaleDateString()){
                            text = `
                                <p> question with title ${question.title} got new answers ! </p>
                            `
                            queue.create('send-email', {
                                title: 'notification for new answer'
                              , to: question.userId.email
                              , template: 'email-notification'
                            }).save( function(err){
                               if( err ){
                                console.log('err: ', err);
                               }
                            });
                            
                            console.log('masuk cron');
                        } else {
                            console.log('gagal masuk cron');
                        }
                    })
                } else {
                    console.log('length answers === 0');
                }
            })
        })
        .catch(err => {
            console.log('err: ', err);

        })
        
}, null, true, 'Asia/Jakarta');

queue.process('send-email', (job, done) => {
    sendEmail(job.data.to, text)
    done()
})

class QuestionController {
    static createAnswer(req, res){
        console.log(req.body)
        let newAnswer;
        let {title, description} = req.body
        Answer.create({
            title,
            description,
            userId : req.loggedUser._id
        })
            .then(answer => {
                console.log(answer, '11111111111111');
                newAnswer = answer
                return Question.findById(req.params.id).populate('userId')
            })
            .then(ques => {
                
                let answers = ques.answers
                answers.push(newAnswer)
                ques.set({answers})
                return ques.save()
                
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
    static create(req, res){
        console.log('masuk create question controller');
        let {title, description, tags} = req.body
        Question.create({
            title,
            description,
            userId : req.loggedUser._id,
            tags
        })
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static getAllTags(req, res){
        Question.find({})
            .then(data => {
                let allTags = []
                data.forEach(quest => {
                    quest.tags.forEach(tag => {
                        allTags.push(tag)
                    })
                })
                allTags = [...new Set(allTags)]
                console.log('allTags: ', allTags);
                res.json(allTags)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res){
        Question.find({}).populate('userId').sort({'createdAt': 'descending'})
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    
    static findOne(req, res){
        Question.findById(req.params.id)
            .populate('userId')
            .populate({
                path : 'answers',
                populate : {
                    path : 'userId'
                }
            })
            .then(ques => {
                
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static update(req, res){
        let obj = {}
        let {title, description, upvote, downvote, tags} = req.body
        if(title) obj.title = title
        if(description) obj.description = description
        if(upvote) obj.upvote = upvote
        if(downvote) obj.downvote = downvote
        if(tags) obj.tags = tags
        
        Question.findByIdAndUpdate(req.params.id, obj)
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res){
        Question.findByIdAndDelete(req.params.id)
            .then(ques => {
                res.status(201).json(ques)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static setUpvote(req, res){
        Question.findById(req.params.id)
            .then(ques => {
                let flag = true
                let index = null
                ques.upvote.forEach((el, i) => {
                    if(el == req.loggedUser._id){
                        flag = false
                    }
                })
                if(flag){
                    let idx = 0
                    ques.downvote.forEach((el, i) => {
                        if(el == req.loggedUser._id){
                            flag = false
                            idx = i
                        }
                    })
                    if(flag){
                        ques.upvote.push(req.loggedUser._id)
                        return ques.save()
                    } else {
                        ques.downvote.splice(idx, 1)
                        ques.upvote.push(req.loggedUser._id)
                        return ques.save()
                    }
                } else{
                    ques.upvote.splice(index, 1)
                    return ques.save()
                }
            })
            .then(saved => {
                res.json(saved)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static setDownvote(req, res){
        Question.findById(req.params.id)
            .then(ques => {
                let flag = true
                let index = null
                ques.downvote.forEach((el, i) => {
                    if(el == req.loggedUser._id){
                        flag = false
                        index = i
                    }
                })
                if(flag){
                    let idx = 0
                    ques.upvote.forEach((el, i) => {
                        if(el == req.loggedUser._id){
                            flag = false
                            idx = i
                        }
                    })
                    if(flag){
                        ques.downvote.push(req.loggedUser._id)
                        return ques.save()
                    } else {
                        ques.upvote.splice(idx, 1)
                        ques.downvote.push(req.loggedUser._id)
                        console.log(ques)
                        return ques.save()
                    }
                } else{
                    ques.downvote.splice(index, 1)   
                    return ques.save()
                }
            })
            .then(saved => {
                console.log(saved)
                res.json(saved)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
    
}

module.exports = QuestionController