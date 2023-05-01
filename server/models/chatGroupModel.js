const mongoose = require("mongoose");

const ChatGroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: {
    type: Array,
    default: [],
    ref: "User",
  },
  messages: {
    type: Array,
    default: [],
    username: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
});

module.exports = mongoose.model("ChatGroup", ChatGroupSchema);
