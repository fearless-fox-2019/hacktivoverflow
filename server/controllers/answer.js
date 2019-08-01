const Answer = require('../models/answer');
const Question = require('../models/question')
class ControllerAnswer {

  static create(req, res, next) {
    req.body.author = req.decoded.id
    Answer.create(req.body)
    .then((created) => {
      return Question.updateOne({
        _id: created.questionId
      }, {
        $push: {
          answer: created
        }
      })
    })
    .then((updated) => {
      res.status(200).json(updated)
    })
    .catch(next)
  }

  static getAuthor(req, res, next) {
    Answer.find({
      author: req.decoded.id
    })
    .populate({
      path: 'author',
      select: ['fullname', 'username', 'updatedAt']
    })
    .sort([['updatedAt', -1]])
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }

  static destroy(req, res, next) {
    Answer.findByIdAndDelete(req.params.id)
    .then((destroy) => {
      res.status(200).json(destroy)
    })
    .catch(next)
  }

  static update(req, res, next) {
    console.log('>>>>>', req.body);
    Answer.findById(req.params.id)
    .then((found) => {
      found.updatedAt = new Date()
      found.answer = req.body.answer
      found.save()
      res.status(200).json(found)
    })
  }

  static vote(req, res, next) {
    Answer.findById(req.params.id)
    .then((found) => {
      if (found == null) {
        throw {
          message: 'Answer Not Found',
          status: 404
        }
      }

      const isUpVoteExist = found.upvotes.some((val) => val._id == req.decoded.id)
      const isDownVoteExist = found.downvotes.some((val) => val._id == req.decoded.id)

      if (isUpVoteExist === true && req.body.vote == 'up') {
        const removed = found.upvotes.filter((val) => val != req.decoded.id);
        found.upvotes = removed;
        found.save();
        res.status(200).json(found);
      } else if(isDownVoteExist === true && req.body.vote == 'down') {
        const removed = found.downvotes.filter((val) => val != req.decoded.id);
        found.downvotes = removed;
        found.save();
        res.status(200).json(found);
      } else if (isUpVoteExist === false && isDownVoteExist === false) { // Never Vote Before
        console.log("User Haven't Vote Yet");
        (req.body.vote == 'up') ? found.upvotes.push(req.decoded.id)
        : found.downvotes.push(req.decoded.id);
        found.save()
        res.status(200).json(found)
      } else { // User Has Vote Before
        if (req.body.vote == 'up') {
          const removed = found.downvotes.filter((val) => val != req.decoded.id);
          found.downvotes = removed;
          found.upvotes.push(req.decoded.id);
          found.save();
          res.status(200).json(found);
        } else if (req.body.vote == 'down') {
          const removed = found.upvotes.filter((val) => val != req.decoded.id);
          found.upvotes = removed;
          found.downvotes.push(req.decoded.id);
          found.save();
          res.status(200).json(found);
        }
      }
    })
    .catch(next)
  }

}

module.exports = ControllerAnswer
