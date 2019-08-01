const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { encrypt } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input a name']
    },
    email: {
        type: String,
        validate: [{
            validator: function (input) {
                var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return input.match(emailFormat)
            },
            message: props => `Please input a valid email`
        }, {
            validator: function (input) {
                return mongoose.model('Users', userSchema)
                    .findOne({ email: input })
                    .then(data => { if (data) return false })
            },
            message: 'Email already registered!'
        }],
        required: [true, 'Please input your email']
    },
    password: {
        type: String,
        required: [true, 'Please input a password'],
        minlength: 8
    },
    watchedTags: [{
        type: String,
    }]
}, {timestamps : true});

userSchema.pre('save', function (next) {
    mongoose.model('User', userSchema).findOne({email: this.email})
    .then(data => {
        if (data) {
            next()
        } else {
            this.password = encrypt(this.password)
            next()
        }
    })
    .catch(err => {
        console.log(err)
    })
})

const Users = mongoose.model('Users', userSchema);
module.exports = Users
