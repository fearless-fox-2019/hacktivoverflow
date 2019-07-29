const userModel = require('../models/userModel')

class UserController {
  static signup (req, res, next) {
    let {username, email, password} = req.body
    let newUser = { username, email, password}

    userModel
      .create(newUser)
      .then(created => {
        res.status(201).json(created)
      }).catch(next)
  }

  static signin (req, res, next) {
    let searched = {}
    let {ue, password} = req.body

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ue)) {
      searched.email = ue
    } else {
      searched.username = ue
    }

    userModel
      .findOne(searched)
      .then(found => {
        if (found) {
          if (compare(password, found.password)) {
            let payload = {
              username: found.username,
              email: found.email,
              id: found._id
            }
            let token = sign(payload)
            res.status(200).json({
            token})
          } else {
            throw ({
              code: 404,
              message: `invalid username / email / password`
            })
          }
        } else {
          throw ({
            code: 404,
            message: `invalid username / email / password`
          })
        }
      }).catch(next)
  }

  static logeduser (req, res, next) {
    let userId = req.logedUser._id

    userModel
      .findById(userId)
      .then(foundUser => {
        res.status(200).json(foundUser)
      }).catch(next)
  }
}

module.exports = UserController
