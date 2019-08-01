const Question = require('../models/question')
const axios = require("axios")

class ControllerQuestion {
    static getQuote(req, res, next) {
        console.log('sampe ga?')
        var instance = axios.create({
            baseURL: `https://yusufnb-quotes-v1.p.rapidapi.com/widget/~{${req.headers.job}}.json`,
            headers: {
                'X-RapidAPI-Host': "yusufnb-quotes-v1.p.rapidapi.com",
                'X-RapidAPI-Key': "1f0edecd14msh65ce6d436e00729p1d5253jsn32fc3421b74d"
            }
        });
        instance.get(`/`, {
        })
            .then(({ data }) => {
                res.status(200).json(data)

            })
            .catch(next)
    }
    static create(req, res, next) {
        const { title, question, questionHtml } = req.body
        let input = { title, question, questionHtml }
        input.ownerQuestion = req.headers.decoded._id
        Question.create(input)
            .then((question) => {
                res.status(201).json(question)
            })
            .catch(next)
    }
    static get(req, res, next) {
        Question.find().populate('ownerQuestion')
            .then((questions) => {
                res.status(200).json(questions)
            })
            .catch(next)
    }
    static getOne(req, res, next) {
        Question.findById(req.params.id)
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static upVote(req, res, next) {
        Question.findById(req.params.id)
            .then((question) => {

                if (question == null) {
                    throw ({
                        message: "question",
                        code: "401"
                    })
                } else {
                    let filter = question.upVotes.filter(vote => vote == req.headers.decoded._id);
                    let down = question.downVotes.findIndex(vote => vote == req.headers.decoded._id)
                    if (down !== -1) {
                        question.downVotes.splice(down, 1)
                    }
                    if (filter.length > 0) {
                        let index = question.upVotes.findIndex(vote => vote == req.headers.decoded._id)
                        if (index !== -1) {
                            question.upVotes.splice(index, 1)
                        }
                        return question.save()
                    }
                    else {
                        question.upVotes.push(req.headers.decoded._id)
                        return question.save()
                    }
                }
            })
            .then((result) => {
                res.json(result)
            })
            .catch(next)
    }
    static downVote(req, res, next) {
        Question.findById(req.params.id)
            .then((question) => {

                if (question == null) {
                    throw ({
                        message: "question",
                        code: "401"
                    })
                } else {
                    let up = question.upVotes.findIndex(vote => vote == req.headers.decoded._id)
                    if (up !== -1) {
                        question.upVotes.splice(up, 1)
                    }
                    let filter = question.downVotes.filter(vote => vote == req.headers.decoded._id);
                    if (filter.length > 0) {
                        let index = question.downVotes.findIndex(vote => vote == req.headers.decoded._id)
                        if (index !== -1) {
                            question.downVotes.splice(index, 1)
                        }
                        return question.save()
                    }
                    else {
                        question.downVotes.push(req.headers.decoded._id)
                        return question.save()
                    }
                }
            })
            .then((result) => {
                res.json(result)
            })
            .catch(next)
    }
    static destroy(req, res, next) {
        Question.deleteOne({ _id: req.params.id })
            .then((question) => {
                res.status(200).json({
                    message: `berhasil terdelete pada id ${req.params.id}`
                })
            })
            .catch(next)
    }
    static updateStock(req, res, next) {

        Question.findById(req.params.id)
            .then((question) => {
                Question.stock = req.body.stock
                Question.save()
                    .then(question => {
                        res.status(201).json(question)
                    })
                    .catch(next)
            })

            .catch(next)
    }
    static update(req, res, next) {
        Question.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
            .then((question) => {
                res.status(200).json(question)
            })
            .catch(next)
    }
}
module.exports = ControllerQuestion