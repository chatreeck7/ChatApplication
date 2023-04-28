const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  updateNickname,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.put("/updatenickname/:id", updateNickname);

module.exports = router;
