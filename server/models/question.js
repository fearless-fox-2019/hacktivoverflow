const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Question Title cannot be empty']
    },
    description:{
        type: String,
        required: [true, 'Description Question cannot be empty']
    },
    views:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    upvotes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:{
        type: Array,
        default: []
    }
}, {timestamps: true});


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
