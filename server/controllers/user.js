const User = require('../models/user');
const { compareHash } = require('../helpers/bcrypt');
const { sign } = require('../helpers/token');
const axios = require('axios');

class ControllerUser {

  static signUp(req, res, next) {
    User.create(req.body)
    .then((created) => {
      res.status(201).json(created)
    })
    .catch(next)
  }

  static signIn(req, res, next) {
    User.findOne({
      email : req.body.email
    })
    .then((found) => {
      if (found) {
        if (compareHash(req.body.password, found.password)) {
          const token = sign({
            id: found._id,
            email : found.email
          }, process.env.SECRET_TOKEN);
          console.log(found);
          res.status(200).json({
            token,
            id : found._id,
            fullname : found.fullname,
            email : found.email
          })
        } else {
          throw {
            status : 401,
            message : 'Invalid Username or Password'
          }
        }
      } else {
        throw {
          status : 401,
          message : 'Invalid Username or Password'
        }
      }
    })
    .catch(next)
  }

}

module.exports = ControllerUser
