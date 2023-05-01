const Messages = require("../models/messageModel");
const ChatGroup = require("../models/chatGroupModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: {
          text: msg.message.text,
          username: msg.message.username,
          time: msg.message.time,
        },
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, time, username } = req.body;
    const data = await Messages.create({
      message: { text: message, time: time, username: username },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addChatGroup = async (req, res, next) => {
  try {
    const { chatName, users } = req.body;
    // if chatGroup already exists, add users to the chatGroup
    const chatGroup = await ChatGroup.find({ name: chatName });

    if (chatGroup.length > 0) {
      const user = users[0];
      // if user already exists in the chatGroup, return the chatGroup
      if (chatGroup[0].users.includes(user)) {
        return res.json(chatGroup[0]);
      }
      // if user does not exist in the chatGroup, add user to the chatGroup
      const updatedChatGroup = await ChatGroup.findOneAndUpdate(
        { name: chatName },
        { $push: { users: user } },
        { new: true }
      );
      return res.json(updatedChatGroup);
    } else {
      // if chatGroup does not exist, create a new chatGroup
      const newChatGroup = await ChatGroup.create({
        name: chatName,
        users,
      });
      return res.json(newChatGroup);
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessagesChatGroups = async (req, res, next) => {
  try {
    const { chatName } = req.body;
    const chatGroup = await ChatGroup.find({ name: chatName });
    const messages = chatGroup[0].messages;
    // console.log(messages);
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === req.params.id,
        message: {
          text: msg.message.text,
          username: msg.message.username,
          time: msg.message.time,
        },
      };
    });
    // console.log(projectedMessages);
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessageChatGroups = async (req, res, next) => {
  try {
    const { chatName, message, sender, time, username } = req.body;
    const chatGroup = await ChatGroup.find({ name: chatName });
    if (chatGroup.length === 0) {
      return res
        .status(400)
        .json({ success: "false", msg: "Chat group does not exist" });
    }
    const updatedChatGroup = await ChatGroup.findOneAndUpdate(
      { name: chatName },
      {
        $push: {
          messages: {
            message: { text: message, time: time, username: username },
            sender: mongoose.Types.ObjectId(sender),
            createAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    );
    res.json(updatedChatGroup);
  } catch (ex) {
    next(ex);
  }
};
