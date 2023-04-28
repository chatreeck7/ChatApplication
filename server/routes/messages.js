const {
  addMessage,
  getMessages,
  addChatGroup,
  getMessagesChatGroups,
  addMessageChatGroups,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/createGroup/", addChatGroup);
router.post("/addmsggroup", addMessageChatGroups);
router.post("/getmsggroup/:id", getMessagesChatGroups);

module.exports = router;
