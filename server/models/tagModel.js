const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tagSchema = new Schema({
    tagname: {
        type: String,
        required: [true, `Tag name required`]
    },
    watcher: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default:[]
    }],
    description: {
        type: String,
        default: ''
    }
})

let Tag = mongoose.model('Tag',tagSchema)

module.exports = Tag