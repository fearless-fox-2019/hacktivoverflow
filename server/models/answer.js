const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answer:  {
    type : String,
    required : [true, `Please Provide an Answer`],
  },
  questionId: {
    type : Schema.Types.ObjectId,
    ref: 'question'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }]
}, {
  versionKey: false,
  timestamps: true,
});

let Answer = mongoose.model('answer', answerSchema)

module.exports = Answer
