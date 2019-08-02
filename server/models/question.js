const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type : String,
        required : [true, 'Question must have a title']
    },
    description: {
        type : String,
        required : [true, 'There must be description for question']
    },
    upvotes: [ { 
        type: Schema.Types.ObjectId, ref: 'user' 
    }  ],
    downvotes: [ { 
        type: Schema.Types.ObjectId, ref: 'user' 
    } ],
    userId: { 
        type: Schema.Types.ObjectId, ref: 'user'
    },
},{ 
    timestamps: true 
})

let question = mongoose.model('question', questionSchema)

module.exports = question