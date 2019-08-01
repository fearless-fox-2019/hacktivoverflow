const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Answer Title cannot be empty']
    },
    description:{
        type: String,
        required: [true, 'Description Answer cannot be empty']
    },
    upvotes:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    downvotes:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    QuestionId:{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
}, {timestamps: true});


const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
