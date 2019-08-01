const Answer = require("../models/answer");

class AnswerController{

    static create(req, res, next){
        const answerData = {
            answer: req.body.answer,
            question: req.headers.question,
            owner: req.headers.payload.id
        }

        Answer.create(answerData)
            .then((newAnswer) => {
                res.status(201).json(newAnswer);
            })
            .catch((err) => {
                next(err);
            });
    }

    static update(req, res, next){
        let answerData = {};
        req.body.title && (answerData.title = req.body.title);
        req.body.answer && (answerData.answer = req.body.answer);

        Answer.findByIdAndUpdate(req.params.id, answerData, {runValidators: true, new: true})
            .then((answer) => {
                res.status(200).json(answer);
            })
            .catch((err) => {
                next(err);
            });

    }

    static delete(req, res, next){

        Answer.findByIdAndDelete(req.params.id)
            .then((answer) => {
                res.status(200).json(answer);
            })
            .catch((err) => {
                next(err);
            });

    }

    static findById(req, res, next){

        Answer.findById(req.params.id)
            .then((answer) => {
                res.status(200).json(answer)
            })
            .catch((err) => {
                next(err);
            });

    }

    static findAll(req, res, next){

        Answer.find({question: req.params.questionId})
            .populate("owner")
            .then((answer) => {
                res.status(200).json(answer);
            })
            .catch((err) => {
                next(err);
            });

    }

    static vote(req, res, next){

        const voteData = {
            user: req.headers.payload.id
        }

        if(req.query.type == "up"){
            voteData.voteNumb = 1;
        }else if(req.query.type == "down"){
            voteData.voteNumb = -1;
        }

        Answer.findById(req.params.id)
            .then((answer) => {
                let found = false;
                let newVotes = answer.votes;

                found = newVotes.find(function(element, index){
                    if(element.user == voteData.user){
                        newVotes[index] = voteData;
                        return true;
                    }
                });

                if(!found){
                    newVotes.push(voteData)
                }

                return Answer.findByIdAndUpdate(req.params.id, {votes: newVotes}, {new: true});
            })
            .then((answer) => {
                res.status(200).json(answer);
            })
            .catch((err) => {
                next(err);
            });

    }
}

module.exports = AnswerController;