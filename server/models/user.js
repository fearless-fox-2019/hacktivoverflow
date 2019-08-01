const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("../helpers/bcrypt");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "User password is required"]
    }
});

userSchema.pre("save", function isValidEmail(next){
    const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    
    if(regex.test(this.email)){
        next()
    }else{
        next({code: 400, message: "Invalid email format"});
    }
});

userSchema.pre("save", function isValidUsername(next){
    if(this.username.length <= 6){
        next({code: 400, message: "Username must be longer than 6 characters"});
    }else{
        next();
    }
});

userSchema.pre("save", function isValidPassword(next){
    if(this.password.length <= 6){
        next({code: 400, message: "Password must be longer than 6 characters"});
    }else{
        bcrypt.hash(this.password)
            .then((hashed) => {
                this.password = hashed;
                next();
            })
            .catch((err) => {
                next(err);
            });
    }
});

userSchema.post('save', function duplicateData(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next({code: 400, message: "Email or Username is already used"});
    } else {
      next();
    }
  });

const User = mongoose.model("user", userSchema);

module.exports = User;