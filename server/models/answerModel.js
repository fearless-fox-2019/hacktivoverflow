const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    asnwer: {
        type: String,
        required: [true, `answer filed cannot be empty`]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
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
    }]
},{
    timestamps: true
})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer