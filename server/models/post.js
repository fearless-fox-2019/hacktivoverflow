const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please input post's title"]
    },
    description:{
        type: String,
        required: [true, "Please input post's description"]
    },
    tags: Array,
    upvotes: Array,
    downvotes: Array,
    comments: Array,
    userId: {
        type: Schema.Types.ObjectId,
        ref : "Users"
    }
}, {timestamps : true});

const posts = mongoose.model('Posts', PostSchema);
module.exports = posts