const userModel = require('../models/userModel')
const tagModel = require('../models/tagModel')
const { hash, compare } = require('../helpers/bcryptjs')
const { verify, sign } = require('../helpers/jwtoken')
const sendEmail = require('../helpers/nodemialer')

class UserController {
  static signup (req, res, next) {
    console.log('-----===== signup =====-----')
    let {username, email, password} = req.body
    let newUser = { username, email, password}

    userModel
      .create(newUser)
      .then(created => {
        let bodyEmail = `
        <h1> Welcome to Hoverflow ${created.username}</h1>
        <h3>In hoverflow you can create a question and see other people question</h3>
        <br>
        <p>if you have a question to other perople just create a nuw questioin in home page, then wiat for other perople to answer it.</p>
        <br>
        <br>
        <br>
        <p>sincerelly</p>
        <p>Hoverflow Team</p>
        `
        sendEmail(created.email, bodyEmail)
        res.status(201).json(created)
      }) .catch(next)
  }

  static signin (req, res, next) {
    console.log('-----===== signin =====-----')
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
    console.log('-----====== whoami =====-----')
    let userId = req.logedUser._id

    userModel
      .findById(userId)
      .then(foundUser => {
        foundUser.password = undefined
        foundUser.__v = undefined
        res.status(200).json(foundUser)
      }).catch(next)
  }

  static watchedtag (req, res, next) {
    let tags = req.body.tags
    let userId = req.logedUser._id

    // tags = tags.split(',')
    let newwatch

    userModel
      .findById(userId)
      .then(found => {
        found.watchTag.forEach(element => {
          tags.push(element)
        })
        tags = [...new Set(tags)]
        return userModel
          .findByIdAndUpdate(userId, {
            watchTag: tags
          }, {
            new: true
          })
      })
      .then(watched => {
        console.log(watched.watchTag, 'ini watched yang baru')
        let newTag = []
        watched.watchTag.forEach(el => {
          newTag.push({tagname: el})
        })
        newwatch = watched
        return tagModel.insertMany(newTag)
      })
      .then(created => {
        console.log(created, 'ini creatednya')
        console.log(newwatch, 'ini creatednya')
        res.json(newwatch)
      }).catch(next)
  }
  static removewatch (req, res, next) {
    let tagname = req.body.tagname
    let userId = req.body.userId
    console.log(tagname, 'ini tagname')
    userModel
      .findByIdAndUpdate(userId, {
        $pull: {
          watchTag: tagname
        }
      }, {
        new: true
      })
      .then(found => {
        console.log(found)
        res.status(200).json(found)
      }).catch(next)
  }
}

module.exports = UserController
