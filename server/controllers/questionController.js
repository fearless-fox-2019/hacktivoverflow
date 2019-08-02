const question = require("../models/question.js");
const answer = require("../models/answer.js");

class QuestionController {

  static create(req, res, next) {
    console.log('masuk ke create question')
    let id = req.decode.id;
    let newQuestion = {
      title: req.body.title,
      description: req.body.description,
      userId: id
    };
    question.create(newQuestion)
      .then(result => {
        res.status(201).json(result);
        console.log('berhasil create question')
      })
      .catch(next);
  }

  static readOwnQuestion(req, res, next){
    console.log('masuk ke read own question')
    question.find({ userId : req.decode.id })
    .then(questions => {
        res.status(201).json(questions)
        console.log('berhasil get all own question')
    })
    .catch(next)
  }

  static readAllQuestion(req, res, next){
    console.log('masuk ke read all question')
    question.find({})
    .then(questions => {
        res.status(201).json(questions)
        console.log('berhasil get all Question')
    })
    .catch(next)
  }

  static deleteQuestion(req, res, next){
    question.findById(req.params.id)
    .then(question => {
        if(question){
            question.deleteOne({ id : req.params.id })
            res.status(200).json({ id : req.params.id })
            console.log('berhasil delete question')
        }else{
            throw({ code : 404, message : 'Question does not Exist'})
        }
    })
    .catch(next)
  }
}

module.exports = QuestionController;
