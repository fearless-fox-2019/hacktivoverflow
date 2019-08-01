const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please input post's title"]
    },
    description: {
        type: String,
        required: [true, "Please input post's description"]
    },
    upvotes: Array,
    downvotes: Array,
    userId: {
        type: Schema.Types.ObjectId,
        ref : "Users"
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Posts"
    }
}, {timestamps : true});

const comments = mongoose.model('Comments', CommentSchema);
module.exports = comments