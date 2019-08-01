const Question = require('../models/question');

class ControllerQuestion {
  static create(req, res, next) {
    req.body.author = req.decoded.id
    Question.create(req.body)
    .then((created) => {
      res.status(201).json(created)
    })
    .catch(next)
  }

  static getAll(req, res, next) {
    Question.find()
    .populate({
      path: 'author',
      select: ['fullname', 'username', 'updatedAt']
    })
    .populate({
      path: 'answer',
      populate: [
        {
          path: 'author',
          select: ['fullname', 'username', 'updatedAt']
        }
      ]
    })
    .sort([['updatedAt', -1]])
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }

  static getAuthor(req, res, next) {
    Question.find({
      author: req.decoded.id
    })
    .populate({
      path: 'author',
      select: ['fullname', 'username', 'updatedAt']
    })
    .populate({
      path: 'answer',
      populate: [
        {
          path: 'author',
          select: ['fullname', 'username', 'updatedAt']
        }
      ]
    })
    .sort([['updatedAt', -1]])
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }

  static getOne(req, res, next) {
    Question.findById(req.params.id)
    .populate({
      path: 'author',
      select: ['fullname', 'username', 'updatedAt']
    })
    .populate({
      path: 'answer',
      populate: [
        {
          path: 'author',
          select: ['fullname', 'username', 'updatedAt']
        }
      ]
    })
    .then((found) => {
      res.status(200).json(found)
    })
    .catch(next)
  }

  static update(req, res, next) {
    Question.findById(req.params.id)
    .then((found) => {
      found.updatedAt = new Date()
      found.title = req.body.title
      found.question = req.body.question
      found.save()
      res.status(200).json(found)
    })
    .catch(next)
  }

  static destroy(req, res, next) {
    Question.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      res.status(200).json(deleted)
    })
    .catch(next)
  }

  static vote(req, res, next) {
    Question.findById(req.params.id)
    .then((found) => {
      if (found == null) throw { // Handle if 'Someone' 'by Accident Firing Into my BackEnd API :p
        message: "Question Doesn't Exist" ,
        status: 404,
      }

      const isUpVoteExist = found.upvotes.some((val) => val._id == req.decoded.id);
      const isDownVoteExist = found.downvotes.some((val) => val._id == req.decoded.id);

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

module.exports = ControllerQuestion