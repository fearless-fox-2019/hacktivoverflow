const Question = require("../models/question");

class QuestionController {
  static create(req, res, next) {
    console.log(req.body);
    let input = req.body;
    Question.create(input)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => next(err));
  }

  static findAll(req, res, next) {
    Question.find(req.query)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static findOne(req, res, next) {
    Question.findById(req.params.questionId)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static replace(req, res, next) {
    Question.findByIdAndUpdate(req.params.questionId, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    Question.findByIdAndUpdate(req.params.questionId, req.body, {
      runValidators: true,
      new: true
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static deleteOne(req, res, next) {
    Question.findByIdAndDelete(req.params.questionId, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }
}

module.exports = QuestionController;
