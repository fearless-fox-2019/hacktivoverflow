const Answer = require('../models/answer');
const Question = require('../models/question');

class AnswerController {
  static findAll(req, res, next) {
    Answer
      .find()
      .populate('UserId')
      .then(answers => res.status(200).json(answers))
      .catch(next);
  }

  static findBelongs(req, res, next) {
    Answer
      .find({ QuestionId: req.params.QuestionId })
      .populate('UserId')
      .then(answers => res.status(200).json(answers))
      .catch(next);
  }

  static findOne(req, res, next) {
    Answer
      .findOne({ _id: req.params.AnswerId })
      .then(answer => {
        answer ? res.status(200).json(result) : res.status(404).json({ message: 'Not found' })
      })
      .catch(next);
  }

  static create(req, res, next) {
    const { description } = req.body
    let QuestionId = req.params.QuestionId
    let UserId = req.decoded.id
    let answerDesc = ''

    Answer
      .create({
        description,
        upvote: [],
        downvote: [],
        UserId,
        QuestionId
      })
      .then(result => {
        answerDesc = result
        return Question.findByIdAndUpdate(
          QuestionId,
          { $push: { AnswerId: result._id } },
          { new: true }
        )
      })
      .then(result => {
        return Question.findOne(result._id).populate({ path: 'AnswerId', populate: { path: 'UserId' } }).populate('UserId')
      })
      .then(result => {
        return Answer
          .findOne({ _id: answerDesc._id })
          .populate('UserId', 'username')
      })
      .then(answer => res.status(201).json(answer))
      .catch(next);
  }

  static update(req, res, next) {
    let objUpdate = {}
    for (let key in req.body) {
      objUpdate[key] = req.body[key]
    }

    let updateVal = {}
    let id = req.params.id;
    req.body.description && (updateVal.description = req.body.description);

    Answer
      .findByIdAndUpdate(id, { description: objUpdate.description }, { new: true })
      .populate('UserId')
      .then(answer => res.status(200).json(answer))
      .catch(next);
  }
  static updateVote(req, res, next) {
    let voteType = req.params.voteType;
    let AnswerId = req.params.AnswerId;
    let UserId = req.decoded.id

    Answer
      .findOne({ _id: AnswerId })
      .populate('UserId', 'username')
      .then((answer) => {
        if (voteType === 'upvote') {
          if (answer.upvote.includes(UserId)) answer.upvote.pull(UserId) 
          else if (answer.downvote.includes(UserId)) {
            answer.downvote.pull(UserId)
            answer.upvote.push(UserId)
          } 
          else answer.upvote.push(UserId)
        } else if (voteType === 'downvote') {
          if (answer.downvote.includes(UserId)) answer.downvote.pull(UserId) 
          else if (answer.upvote.includes(UserId)) {
            answer.upvote.pull(UserId)
            answer.downvote.push(UserId)
          } 
          else answer.downvote.push(UserId)
        } 
        else throw new Error('Invalid voteType')
        return answer.save()
      })
      .then((answer) => res.status(200).json(answer))
      .catch(next);
  }

  static delete(req, res, next) {
    Answer
      .findByIdAndDelete(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(next);
  }
}

module.exports = AnswerController;