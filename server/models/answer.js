const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const { Schema } = mongoose;

var answerSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  QuestionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  }
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;