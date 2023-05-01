const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      username: { type: String, required: true },
      text: { type: String, required: true },
      time: { type: String, required: true }
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
