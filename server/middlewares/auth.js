const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");
const jwt = require("../helpers/jwt");

function authenticate(req, res, next){
    
    try{
        const payload = jwt.verify(req.headers.token);
        req.headers.payload = payload;

        User.findById(payload.id)
            .then((user) => {
                if(user){
                    next()
                }else{
                    next({code: 401, message: "Unauthenticate: Invalid token"});
                }
            })
            .catch((err) => {
                next(err);
            })
    }catch(err){
        next({code: 401, message: "Unauthenticate: Invalid token"});
    }

}

function questionAuthorize(req, res, next){

    Question.findById(req.params.id)
        .then((question) => {
            if(question){
                if(question.owner == req.headers.payload.id){
                    next();
                }else{
                    next({code: 401, message: "Unauthorized: Lack of permission"});
                }
            }else{
                next({code: 404, message: "Question is not found"});
            }
        })
        .catch((err) => {
            next(err);
        })

}

function answerAuthorize(req, res, next){

    Answer.findById(req.params.id)
        .then((answer) => {
            if(answer){
                if(answer.owner == req.headers.payload.id){
                    next();
                }else{
                    next({code: 401, message: "Unauthorized: Lack of permission"});
                }
            }else{
                next({code: 404, message: "Answer is not found"});
            }
        })
        .catch((err) => {
            next(err);
        });

}

module.exports = {
    authenticate,
    questionAuthorize,
    answerAuthorize
}