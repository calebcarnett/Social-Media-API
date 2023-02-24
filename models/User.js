const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: () => Promise.resolve(false),
      message: "Email validation failed",
    },
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

userSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const User = model("user", userSchema);

module.exports = User;
