const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  title : String,
  description : String,
  upVote : Array,
  downVote : Array,
  UserId : {type : Schema.Types.ObjectId, ref: 'User'},
  QuestionId : {type : Schema.Types.ObjectId, ref: 'Question'}
},{timestamps:true});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer