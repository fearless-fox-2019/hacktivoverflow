const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    title: {
        type : String,
        required : [true, 'every answer must have a title']
    },
    description: {
        type : String,
        required : [true, 'every answer must have description on it']
    },
    questionId: { 
        type: Schema.Types.ObjectId, ref: 'question'
    },
    upvotes: [ { 
        type: Schema.Types.ObjectId, ref: 'user'
    } ],
    downvotes: [ { 
        type: Schema.Types.ObjectId, ref: 'user'
    } ],
    userId: { 
        type: Schema.Types.ObjectId, ref: 'user'
    }
},{
    timestamps : true
})

let answer = mongoose.model('answer', answerSchema)

module.exports = answer