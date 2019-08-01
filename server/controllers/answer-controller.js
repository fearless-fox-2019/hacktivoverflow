const Answer = require('../models/answer')
const User = require('../models/user')
class ControllerAnswer {
    static create(req, res, next) {
        const newAnswer = {
            answer: req.body.answer,
            answerer: req.headers.decoded._id,
            answerHtml: req.body.answerHtml,
            answeredQuestion: req.params.id
        }
        console.log(req.params.id)
        Answer.create(newAnswer)
            .then((newAnswer) => {
                res.status(201).json({ message: "Succeed on uploaded answer", newAnswer })
            })
            .catch(next);
    }
    static update(req, res, next) {
        Answer.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch(next)
    }
    static upVote(req, res, next) {
        Answer.findById(req.params.id)
            .then((answer) => {

                if (answer == null) {
                    throw ({
                        message: "answer",
                        code: "401"
                    })
                } else {
                    let filter = answer.upVotes.filter(vote => vote == req.headers.decoded._id);
                    let down = answer.downVotes.findIndex(vote => vote == req.headers.decoded._id)
                    if (down !== -1) {
                        answer.downVotes.splice(down, 1)
                    }
                    if (filter.length > 0) {
                        let index = answer.upVotes.findIndex(vote => vote == req.headers.decoded._id)
                        if (index !== -1) {
                            answer.upVotes.splice(index, 1)
                        }
                        return answer.save()
                    }
                    else {
                        answer.upVotes.push(req.headers.decoded._id)
                        return answer.save()
                    }
                }
            })
            .then((result) => {
                res.json(result)
            })
            .catch(next)
    }
    static downVote(req, res, next) {
        Answer.findById(req.params.id)
            .then((answer) => {

                if (answer == null) {
                    throw ({
                        message: "answer",
                        code: "401"
                    })
                } else {
                    let up = answer.upVotes.findIndex(vote => vote == req.headers.decoded._id)
                    if (up !== -1) {
                        answer.upVotes.splice(up, 1)
                    }
                    let filter = answer.downVotes.filter(vote => vote == req.headers.decoded._id);
                    if (filter.length > 0) {
                        let index = answer.downVotes.findIndex(vote => vote == req.headers.decoded._id)
                        if (index !== -1) {
                            answer.downVotes.splice(index, 1)
                        }
                        return answer.save()
                    }
                    else {
                        answer.downVotes.push(req.headers.decoded._id)
                        return answer.save()
                    }
                }
            })
            .then((result) => {
                res.json(result)
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Answer.find({ answeredQuestion: req.params.id })
            .populate("answerer")
            .populate("answeredanswer")
            .then((answers) => {
                res.status(200).json(answers);
            })
            .catch(next);
    }
}
module.exports = ControllerAnswer