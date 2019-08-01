const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema({
  userId:{
    type: ObjectId,
    ref: "User"
  },
  title:{
    type: String
  },
  content:{
    type: String
  },
  answerId: [{
    type: ObjectId,
    ref: "Answer"
  }],
  upvote: [{
    type: ObjectId,
    ref: "User"
  }],
  downvote: [{
    type: ObjectId,
    ref: "User"
  }]
})

module.exports = mongoose.model("Post", PostSchema)