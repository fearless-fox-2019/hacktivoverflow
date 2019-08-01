const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');
const { verify } = require('../helpers/token');

module.exports = {
  authentication: (req, res, next) => {
    // console.log('Masuk Middleware Auth');
    const token = req.headers.token
    // console.log(token);
    if (!token) {
      throw {
        Status: 404,
        message: `Token Not Provided`
      }
    } else {
      const decoded = verify(token)
      User.find({
          _id: decoded.id
        })
        .then((found) => {
          req.decoded = decoded;
          req.loggedUser = found
          next()
        })
        .catch((err) => {
          throw {
            Status: 404,
            message: 'User Not Found || Auth Failed'
          }
        })
    }
  },
  authorization: (req, res, next) => {
    Question.findById(req.params.id)
    .then((found) => {
      if(found.author == req.decoded.id ) {
        next()
      } else {
        throw {
          status : 401,
          message : `Unauthorized Access || Authorization Failed`
        }
      }
    })
    .catch(next);
  },
  authorizationAnswer: (req, res, next) => {
    Answer.findById(req.params.id)
    .then((found) => {
      if(found.author == req.decoded.id ) {
        next()
      } else {
        throw {
          status : 401,
          message : `Unauthorized Access || Authorization Failed`
        }
      }
    })
    .catch(next);
  },
}