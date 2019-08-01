const Question = require('../models/question')
const Answer = require('../models/answer')
const User = require('../models/user')

class QuestionController {

    static makeQuestion(req, res, next) {
        Question.create({
                title: req.body.title,
                content: req.body.content,
                userId: req.headers.decode.id
            })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)
    }

    static getAllQuestion(req, res, next) {
        Question.find()
            .populate('answers')
            .populate('userId')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)

    }

    static findQuestion(req, res, next) {
        Question.findById(req.params.questionId)
            .populate('answers')
            .populate('userId')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static updateQuestion(req, res, next) {
        let update = {}
        req.body.title && (update.title = req.body.title)
        req.body.content && (update.content = req.body.content)

        // console.log(update)
        Question.updateOne({
                _id: req.params.questionId
            }, {
                $set: update
            })
            .then(updatedRow => {
                res.status(200).json("Successfuly update question.")
            })
            .catch(next)
    }

    static deleteQuestion(req, res, next) {
        Question.deleteOne({
                _id: req.params.questionId
            })
            .then(deletedRow => {
                return Answer.deleteMany({
                    questionId: req.params.questionId
                })
            })
            .then(deletedRow => {
                return User.updateMany({}, {
                    $pull: {
                        upvotedQuestion: req.params.questionId,
                        downvotedQuestion: req.params.questionId
                    }
                })
            })
            .then(updatedNum => {
                res.status(200).json('Successfuly delete question')
            })
            .catch(next)
    }

    static upVote(req, res, next) {
        User.findById(req.headers.decode.id)
            .then(user => {
                // console.log(user)
                let upvotedQuestions = user.upvotedQuestion
                let check = upvotedQuestions.find(questionId => questionId == req.params.questionId)
                if (check) {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $pull: {
                                upvotedQuestion: req.params.questionId
                            }
                        }),
                        Question.updateOne({
                            _id: req.params.questionId
                        }, {
                            $pull: {
                                upVotes: req.headers.decode.id
                            }
                        })
                    ])
                } else {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $push: {
                                upvotedQuestion: req.params.questionId
                            },
                            $pull: {
                                downvotedQuestion: req.params.questionId
                            }

                        }),
                        Question.updateOne({
                            _id: req.params.questionId
                        }, {
                            $push: {
                                upVotes: req.headers.decode.id
                            },
                            $pull: {
                                downVotes: req.headers.decode.id
                            }
                        })
                    ])
                }
            })
            .then(([oldUser]) => {
                res.status(200).json('Successfuly upvoted')
            })
            .catch(next)
    }

    static downVote(req, res, next) {
        User.findById(req.headers.decode.id)
            .then(user => {
                let downvotedQuestions = user.downvotedQuestion
                let check = downvotedQuestions.find(questionId => questionId == req.params.questionId)
                if (check) {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $pull: {
                                downvotedQuestion: req.params.questionId
                            }
                        }),
                        Question.updateOne({
                            _id: req.params.questionId
                        }, {
                            $pull: {
                                downVotes: req.headers.decode.id
                            }
                        })
                    ])
                } else {
                    return Promise.all([
                        User.findOneAndUpdate({
                            _id: req.headers.decode.id
                        }, {
                            $push: {
                                downvotedQuestion: req.params.questionId
                            },
                            $pull: {
                                upvotededQuestion: req.params.questionId
                            }
                        }),
                        Question.updateOne({
                            _id: req.params.questionId
                        }, {
                            $push: {
                                downVotes: req.headers.decode.id
                            },
                            $pull: {
                                upVotes: req.headers.decode.id
                            }
                        })
                    ])
                }
            })
            .then(([oldUser]) => {
                res.status(200).json('Successfuly downvoted')
            })
            .catch(next)
    }

}

module.exports = QuestionController