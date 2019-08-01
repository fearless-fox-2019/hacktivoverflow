const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {

    static makeAnswer(req, res, next) {
        Answer.create({
                content: req.body.content,
                userId: req.headers.decode.id,
                questionId: req.params.questionId,
                upVotes: 0,
                downVotes: 0
            })
            .then(answer => {
                return Promise.all([answer, Question.updateOne({
                    _id: answer.questionId
                }, {
                    $push: {
                        answers: answer._id
                    }
                })])
            })
            .then(([answer]) => {
                res.status(201).json(answer)
            })
            .catch(next)
    }

    static findAnswer(req, res, next) {
        Answer.find({
                questionId: req.params.questionId
            })
            .populate('userId')
            .populate('questionId')
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)
    }

    static updateAnswer(req, res, next) {
        Answer.updateOne({
                _id: req.params.answerId
            }, {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            })
            .then(updatedRow => {
                res.status(200).json('Successfully update answer.')
            })
            .catch(next)
    }

    static deleteAnswer(req, res, next) {
        Answer.deleteOne({
                _id: req.params.answerId
            })
            .then(deletedRow => {
                return Question.findOneAndUpdate({
                    _id: req.params.questionId
                }, {
                    $pull: {
                        answers: req.params.answerId
                    }
                })
            })
            .then(deletedDoc => {
                res.status(200).json(deletedDoc)
            })
            .catch(next)
    }

}

module.exports = AnswerController