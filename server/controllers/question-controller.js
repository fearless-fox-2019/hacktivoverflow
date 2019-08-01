const Question = require('../models/question')

class QuestionController {
  static findAll(req, res, next) {
    Question
      .find()
      .sort({ createdAt: -1 })
      .populate('UserId', 'username')
      .then(questions => res.status(200).json(questions))
      .catch(next);
  }

  static findBelongs(req, res, next) {
    Question
      .find({ UserId: req.decoded.id })
      .sort({ createdAt: -1 })
      .populate('UserId', 'username')
      .then(questions => res.status(200).json(questions))
      .catch(next);
  }

  static findOne(req, res, next) {
    Question
      .findById(req.params.id ? req.params.id : req.decoded.id)
      .sort({ createdAt: -1 })
      .populate('UserId', 'username')
      .then(question => res.status(200).json(question))
      .catch(next);
  }

  static create(req, res, next) {
    Question
      .create({...req.body, UserId: req.decoded.id})
      .then(question => {
        return Question
          .findOne({ _id: question.id })
          .populate('UserId', 'username')
      })
      .then(questionDetail => res.status(200).json(questionDetail))
      .catch(next);
  }

  static update(req, res, next) {
    Question
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .populate('UserId', 'username')
      .then(question => res.status(200).json(question))
      .catch(next);
  }

  static delete(req, res, next) {
    Question
      .findByIdAndDelete(req.params.id)
      .then(deleted => res.status(200).json(deleted))
      .catch(next);
  }

  static updateVote(req, res, next) {
    let voteType = req.params.voteType;
    let QuestionId = req.params.QuestionId;
    let UserId = req.decoded.id;

    Question
      .findOne({ _id: QuestionId })
      .populate('UserId', 'username')
      .then((question) => {
        if (question) {
          if (voteType === 'upvote') {
            if (question.upvote.includes(UserId)) question.upvote.pull(UserId)
            else if (question.downvote.includes(UserId)) {
              question.downvote.pull(UserId)
              question.upvote.push(UserId)
            } 
            else question.upvote.push(UserId)
          } 
          else if (voteType === 'downvote') {
            if (question.downvote.includes(UserId)) question.downvote.pull(UserId)
            else if (question.upvote.includes(UserId)) {
              question.upvote.pull(UserId)
              question.downvote.push(UserId)
            } 
            else question.downvote.push(UserId)
          } 
          else res.status(400).json({ message: 'Invalid voteType' })
          return question.save()
        } 
        else res.status(400).json('Question not found')
      })
      .then((question) => res.status(200).json(question))
      .catch(next);
  }
}

module.exports = QuestionController;
