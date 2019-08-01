const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: {
        type: String,
        required: [true, "Answer answer is required"]
    },
    votes: [{
        user: Schema.Types.ObjectId,
        voteNumb: Number
    }],
    question: {
        type: String,
        required: [true, "Question is required"],
        ref: "question"
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, "Owner id is required"],
        ref: "user"
    }

}, {timestamps: true});

const Answer = mongoose.model("answer", answerSchema);

module.exports = Answer;