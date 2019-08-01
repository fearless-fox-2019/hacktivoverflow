const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"]
    },
    description: {
      type: String,
      required: [true, "Please add description"]
    },
    author: {
      type: String,
      required: [true, "Please login first"]
    },
    votes: [{ user_id: Schema.Types.ObjectId, type: Number }]
  },
  { timestamps: true }
);

module.exports = model("Question", questionSchema);
