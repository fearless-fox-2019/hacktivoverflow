const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {
        created_at: 'createdAt'
    }
})


const Question = mongoose.model('Question', questionSchema)
module.exports = Question;