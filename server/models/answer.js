const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const answerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
    answerHtml: {
        type: String
    },
    answerer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    answeredQuestion: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: [true, "answered is required"]
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

module.exports = mongoose.model("Answer", answerSchema)