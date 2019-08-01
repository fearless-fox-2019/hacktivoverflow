const Question = require("../models/question");

class QuestionController{

    static create(req, res, next){
        const questionData = {
            title: req.body.title,
            description: req.body.description,
            owner: req.headers.payload.id
        }

        Question.create(questionData)
            .then((newQuestion) => {
                res.status(201).json(newQuestion);
            })
            .catch((err) => {
                next(err);
            });
    }

    static update(req, res, next){
        let questionData = {};
        req.body.title && (questionData.title = req.body.title);
        req.body.description && (questionData.description = req.body.description);

        Question.findByIdAndUpdate(req.params.id, questionData, {runValidators: true, new: true})
            .then((question) => {
                res.status(200).json(question);
            })
            .catch((err) => {
                next(err);
            });

    }

    static delete(req, res, next){

        Question.findByIdAndDelete(req.params.id)
            .then((question) => {
                res.status(200).json(question);
            })
            .catch((err) => {
                next(err);
            });

    }

    static findById(req, res, next){

        Question.findById(req.params.id)
            .populate("owner")
            .then((question) => {
                res.status(200).json(question)
            })
            .catch((err) => {
                next(err);
            });

    }

    static findAll(req, res, next){
        
        if(!req.query.userId){
            Question.find()
                .populate("owner")
                .then((questions) => {
                    res.status(200).json(questions);
                })
                .catch((err) => {
                    next(err);
                });
        }else{
            Question.find({owner: req.query.userId})
                .populate("owner")
                .then((questions) => {
                    res.status(200).json(questions);
                })
                .catch((err) => {
                    next(err);
                });
        }
        
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

        Question.findById(req.params.id)
            .then((question) => {
                let found = false;
                let newVotes = question.votes;

                found = newVotes.find(function(element, index){
                    if(element.user == voteData.user){
                        newVotes[index] = voteData;
                        return true;
                    }
                });

                if(!found){
                    newVotes.push(voteData)
                }

                return Question.findByIdAndUpdate(req.params.id, {votes: newVotes}, {new: true});
            })
            .then((question) => {
                res.status(200).json(question);
            })
            .catch((err) => {
                next(err);
            });

    }
}

module.exports = QuestionController;