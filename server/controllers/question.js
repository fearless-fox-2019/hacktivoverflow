const Question = require('../models/question')

class QuestionController {
    static fetch(req, res, next) {
        let obj = {}
        let sort = {}
        
        if (req.query.question) {
            obj._id = req.query.question
            sort.createdAt = -1
        }else if(req.query.tag){
            obj.tags = req.query.tag
            sort.createdAt = -1
        }else if(req.query.title){
            obj.title = req.query.title
            sort.createdAt = -1
        }else if(req.query.popular){
            sort.upvotes = -1
            sort.createdAt = -1               
        }else{
            sort.createdAt = -1
        }
        console.log(obj);

        Question.find(obj).populate('user_id').sort(sort)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }


    static fetchMine(req, res, next) {
        Question.find({ user_id: req.decoded.id }).populate('user_id').sort({createdAt : -1})
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        console.log(req.body);

        Question.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.decoded.id,
        })
            .then(newdata => {
                // res.status(201).json(newdata)
                return Question.findOneAndUpdate({ _id: newdata._id }, {
                    $set: {
                        tags: req.body.tags
                    }
                },{
                    new: true,
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: true,
                    populate: 'user_id'})
            })
            .then((data) => {
                res.status(200).json(data)
                console.log('berhasil');

            })
            .catch(next)
    }

    static delete(req, res, next) {
        Question.deleteOne({ _id: req.params.questionid })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static updateDownVote(req, res, next) {
        Question.findById(req.params.questionid, function (err, data) {
            if (err) {
                next
            } else {
                if (data.downvotes.includes(req.decoded.id)) {
                    Question.updateOne({ _id: req.params.questionid }, { $pull: { downvotes: req.decoded.id } }, { new: true })
                        .then((result) => {
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)

                } else if (data.upvotes.includes(req.decoded.id)) {
                    Question.updateOne({ _id: req.params.questionid }, { $pull: { upvotes: req.decoded.id } }, { new: true })
                        .then((result) => {
                            console.log(result);
                            return Question.updateOne({ _id: req.params.questionid }, { $push: { downvotes: req.decoded.id } })
                        })
                        .then((result) => {
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                }
                else {
                    Question.updateOne({ _id: req.params.questionid }, { $push: { downvotes: req.decoded.id } })
                        .then((result) => {
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                }
            }


        })
    }

    static updateUpVotes(req, res, next) {
        Question.findById(req.params.questionid, function (err, data) {
            if (err) {
                next
            } else {
                if (data.upvotes.includes(req.decoded.id)) {
                    Question.updateOne({ _id: req.params.questionid }, { $pull: { upvotes: req.decoded.id } }, { new: true })
                        .then((result) => {
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)

                } else if (data.downvotes.includes(req.decoded.id)) {
                    Question.updateOne({ _id: req.params.questionid }, { $pull: { downvotes: req.decoded.id } }, { new: true })
                        .then((result) => {
                            console.log(result);
                            return Question.updateOne({ _id: req.params.questionid }, { $push: { upvotes: req.decoded.id } })
                        })
                        .then((result) => {
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                }
                else {
                    Question.updateOne({ _id: req.params.questionid }, { $push: { upvotes: req.decoded.id } })
                        .then((result) => {
                            console.log(result);
                            res.json(result)
                        })
                        .catch(next)
                }
            }
        })
    }


    static EditQuestion(req, res, next) {
        console.log(req.body);

        Question.updateOne({ _id: req.params.questionid }, {
            title: req.body.title,
            description: req.body.description,
            user_id: req.decoded.id,
            $set: {
                tags: req.body.tags
            }
        })
            .then((result) => {
                res.json(result)
            })
            .catch(next)
    }
}

module.exports = QuestionController

