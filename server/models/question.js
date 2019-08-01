const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, `You cant ask as anonymus`]
  },
  title: {
    type: String,
    required: [true, `Please provide a title for your question`]
  },
  description: {
    type: String,
    required: [true, ` Please provide description of your question`]
  },
  comments: Array,
  answers: [{ type: Schema.Types.ObjectId, ref: 'answer' }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}, { versionKey: false, timestamps: true })

let Question = mongoose.model('question', questionSchema)

module.exports = Question