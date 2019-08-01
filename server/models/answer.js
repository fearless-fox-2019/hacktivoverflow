const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = new mongoose.Schema({
  userId:{
    type: ObjectId,
    ref: "User"
  },
  title: {
    type: String
  },
  content:{
    type: String
  },
  postId:{
    type: ObjectId,
    ref: "Post"
  },
  upvote: [{
    type: ObjectId,
    ref: "User"
  }],
  downvote: [{
    type: ObjectId,
    ref: "User"
  }]
})

module.exports = mongoose.model("Answer", AnswerSchema)