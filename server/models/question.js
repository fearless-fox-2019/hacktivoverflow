const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Question title is required"]
    },
    description: {
        type: String,
        required: [true, "Question description is required"]
    },
    votes: [{
        user: Schema.Types.ObjectId,
        voteNumb: Number
    }],
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, "Owner id is required"],
        ref: "user"
    }

}, {timestamps: true});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;