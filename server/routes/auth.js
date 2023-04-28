const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  updateNickname,
  getAllChatGroups,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/allgroups/:id", getAllChatGroups);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.put("/updatenickname/:id", updateNickname);

module.exports = router;
