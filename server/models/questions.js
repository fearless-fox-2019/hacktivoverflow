const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tag = require('./tags')
const questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required : true
  },
  content: {
    type: String,
    required : true
  },
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  tags: [{
    type: Schema.Types.ObjectId, ref: 'Tag'
  }] 
}, {timestamps : true})



const Question = mongoose.model('Question', questionSchema)

module.exports = Question