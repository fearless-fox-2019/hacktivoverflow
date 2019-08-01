const Answer = require("../models/answer");

class AnswerController {
  static create(req, res, next) {
    let input = {
      ...req.body
    };
    Answer.create(input)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => next(err));
  }

  static findAll(req, res, next) {
    Answer.find(req.query)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static findOne(req, res, next) {
    Answer.findById(req.params.answerId)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static replace(req, res, next) {
    Answer.findByIdAndUpdate(req.params.answerId, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    Answer.findByIdAndUpdate(req.params.answerId, req.body, {
      runValidators: true,
      new: true
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }

  static deleteOne(req, res, next) {
    Answer.findByIdAndDelete(req.params.answerId, req.body)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => next(err));
  }
}

module.exports = AnswerController;
