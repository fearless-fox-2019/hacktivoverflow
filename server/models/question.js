const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const questionSchema = new Schema({
  title: {
    type: String,
    required : [true, `Please Provide a Title`],
  },
  question:  {
    type : String,
    required : [true, `Please Provide a Question`],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  answer: [{
    type : Schema.Types.ObjectId,
    ref: 'answer',
  }],
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

let Question = mongoose.model('question', questionSchema)

module.exports = Question
