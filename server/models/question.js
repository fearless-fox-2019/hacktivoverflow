const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema= new Schema({
    title:{
        type: String,
        required: [true, 'Title required']
    },
    description:{
        type: String,
        required: [true, 'Description required']
    },
    tags:[{
        type: String
    }],
    upvotes:[
        { type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    downvotes:[
        { type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    answers:[{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }  
},{timestamps: true})

let Question = mongoose.model('Question', questionSchema)

module.exports= Question