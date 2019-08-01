const userModel = require('../models/userModel')
const tagModel = require('../models/tagModel')
const { hash, compare } = require('../helpers/bcryptjs')
const { verify, sign } = require('../helpers/jwtoken')
const CronJob = require('cron').CronJob

new CronJob('* * * * * * ', function () {
  
}, null, true, 'Asia/Jakarta')

class UserController {
  static signup (req, res, next) {
    console.log('-----===== signup =====-----')
    let {username, email, password} = req.body
    let newUser = { username, email, password}

    userModel
      .create(newUser)
      .then(created => {
        res.status(201).json(created)
      }).catch(next)
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
