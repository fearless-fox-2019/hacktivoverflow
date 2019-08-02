const { Schema, model } = require('mongoose')

const answerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please add title']
    },
    description: {
        type: String,
        required: [true, 'Please add description']
    },
    author: {
        type: String,
        required: [true, 'Please login first']
    },
    questionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    votes: [{ user_id : Schema.Types.ObjectId , type: Number }]
}, { timestamps: true })

module.exports = model('Answer', answerSchema)