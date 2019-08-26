const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title:  {
      type : String,
      required : [true]
  },
  question : {
    type : String
  },
  tags : [String],
  upvote : [{type : Schema.Types.ObjectId, ref: 'User'}],
  downvote : [{type : Schema.Types.ObjectId, ref: 'User'}],
  UserId : {type : Schema.Types.ObjectId, ref: 'User'}
}, {timestamps:true});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question