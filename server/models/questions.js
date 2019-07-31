const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },
  content: {
    type: String,
    required: [true,'description is required']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answerId: [{
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
  }]
},{timestamps:true})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question