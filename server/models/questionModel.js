const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'question title cannot be empty']
    },
    content: {
        type: String,
        required: [true, 'question content cannot be empty']
    },
    upVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],
    tags: [{
        type: String,
        ref: 'Tag'
    }]
},{
    timestamps: true
})

let Question = mongoose.model('Question',questionSchema)

module.exports = Question

