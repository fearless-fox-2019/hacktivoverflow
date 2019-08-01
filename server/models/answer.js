const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'user',
        required: [true, `You cant ask as anonymus`]
    },
    questionId : {
      type : Schema.Types.ObjectId,
      ref : 'question'
    },
    description : String, 
    comments: Array,
    upvotes : [{type:Schema.Types.ObjectId , ref : 'user'}],
    downvotes : [{type:Schema.Types.ObjectId, ref : 'user'}]
}, { versionKey: false, timestamps: true })

let Answer = mongoose.model('answer', answerSchema)

module.exports = Answer