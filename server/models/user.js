const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { encrypt } = require("../helpers/bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    password: {
      type: String,
      min: [6, "Min length is 6"],
      required: [true, "can't be blank"]
    }
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, { message: "is already taken." });

userSchema.pre("save", function(next) {
  this.password = encrypt(this.password);
  next();
});

module.exports = model("User", userSchema);
