const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is empty"]
    },
    title: {
        type: String,
        required: [true, "title is empty"]
    },
    ownerQuestion: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    questionHtml: {
        type: String,
    },
    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

module.exports = mongoose.model("Question", questionSchema)