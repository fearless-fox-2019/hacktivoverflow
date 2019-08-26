const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hashPassword} = require('../helpers/bcrypt.js')

const userSchema = new Schema({
  firstname:  {
      type : String,
      required : true
  },
  lastname: {
      type : String,
      required : true
  },
  birthday: Date,
  email: {
      type : String,
      validate : [{
          validator : function(email){
              return User.findOne({email : email})
              .then(found => {
                  if(found) return false
                  else return true
              })
              .catch(err => {
                  throw {
                      err
                  }
              })
          }
      },{
          validator : function(email){
            let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email)
          }, message : props => 'Email is invalid'
      }
    ]
  },
  password : String
}, {timestamps : true});

userSchema.pre('save', function(next){
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User