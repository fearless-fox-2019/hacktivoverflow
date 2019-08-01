const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    answer: {
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
    }],
    totalVote: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

// answerSchema.pre('findOneAndUpdate',function(error, doc){
//     console.log(doc.upVote,'ini upvote')
//     this.totalVote = this.upVote.length - this.downVote.length
//     next()
// })

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer