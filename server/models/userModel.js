const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {
    hash
} = require('../helpers/bcryptjs')

let userSchema = new Schema({
    username: {
        type: String,
        required: [true, `required username`]
    },
    email: {
        type: String,
        required: [true, `required email`],
        validate: [{
            validator: function (val) {
                return val.match(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/);
            },
            message: `invalid email format`
        }, {
            validator: function (val) {
                return new Promise((res, rej) => {
                    User.findOne({
                            email: val
                        })
                        .then(found => {
                            if (found) {
                                res(false)
                            } else {
                                res(true)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            },
            message: `email has been used`
        }]
    },
    password: {
        type: String,
        required: [true, `required password`],
        minlength: [6, `password too short`]
    },
    watchTag: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        default: []
    }],
    question: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        default: []
    }],
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        default: []
    }],
    follower: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
}, {
    timestamps: true
})


userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})


let User = mongoose.model('User', userSchema)

module.exports = User