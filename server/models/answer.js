const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    upVotes: {
        type: Number
    },
    downVotes: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {
        created_at: 'createdAt'
    }
})


const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer;