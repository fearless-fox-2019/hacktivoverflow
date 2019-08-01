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
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    downVote: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `required user id to create questions`]
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer',
        default: []
    }],
    tags: [{
        type: String,
        ref: 'Tag',
        default: []
    }],
    solved: {
        type: Boolean,
        default: false
    },
    totalVote: {
        type: String,
        default: 0,
    }
},{
    timestamps: true
})



let Question = mongoose.model('Question',questionSchema)

module.exports = Question

