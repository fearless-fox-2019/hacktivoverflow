const User = require('../models/user');
const Helper = require('../helpers/helper');
const transporter = require('../helpers/nodemailer');
const cron = require('node-cron');
// const kue = require('kue');
// const queue = kue.createQueue();

class UserController {
  static register(req, res, next) {
    User
      .create(req.body)
      .then(user => {
        cron.schedule('0 0 */1 * *', () => {
          transporter.sendMail({
            to: req.body.email,
            subject: 'Welcome to Omniscience',
            html:`<p>Selamat bergabung di Omniscience</p>`
          }, (err, data) => {
            if (err) {
              console.log(err);
              // throw { status: 500, message: 'Internal server error' }
            }
            else console.log('email delivered');
          })
        })
        
        let token = Helper.generateJWT({
          email: user.email,
          username: user.username,
          id: user._id
        });
        
        res.status(201).json({
          token,
          id: user._id,
          username: user.username,
          email: user.email
        });
    
      })
      .catch(next);
  };

  static login(req, res, next) {
    const { email, password } = req.body;

    User
      .findOne({ email })
      .then(user => {
        if (!user) throw { status: 404, message: 'Username/password wrong' };
        else {
          if (Helper.comparePassword(password, user.password)) {

              let token = Helper.generateJWT({
                  email: user.email,
                  username: user.username,
                  id: user._id
              });

              res.status(200).json({
                token,
                id: user._id,
                username: user.username,
                email: user.email
              });
          }
          else throw { status: 404, message: 'Username/password wrong' };
        };
    })
    .catch(next);
  };

  static findAll(req, res, next) {
    User
      .find()
      .then(user => res.status(200).json(user))
      .catch(next);
  };

  static findOne(req, res, next) {
    User
      .findById(req.params.id ? req.params.id : req.decoded.id)
      .then(user => {
        console.log(user);
        res.status(200).json(user)
      })
      .catch(next);
  };

  static destroy(req, res, next) {
    User
      .findByIdAndDelete(req.params.id ? req.params.id : req.decoded.id)
      .then(user => res.status(200).json(user))
      .catch(next);
  };
};

module.exports = UserController;