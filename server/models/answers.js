const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'title is required']
  },
  content: {
    type: String,
    required: [true, 'content is required']
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{timestamps:true})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer