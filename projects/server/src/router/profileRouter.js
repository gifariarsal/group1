const express = require("express");
const router = express.Router();
const { profileControllers } = require("../controller");
const {
  verifyToken,
  validateChangeUsername,
  validateChangeEmail,
  validateChangePassword,
  multerUpload,
  validate
} = require("../middleware");

router.patch("/profile/change-username", verifyToken, validateChangeUsername, validate, profileControllers.changeUsername);
router.patch("/profile/change-password", verifyToken, validateChangePassword, validate, profileControllers.changePassword);
router.patch("/profile/change-email", verifyToken, validateChangeEmail, validate, profileControllers.changeEmail);
router.patch(
  "/profile/change-avatar",
  verifyToken,
  multerUpload.single("avatars"),
  profileControllers.changeAvatar
);

module.exports = router;
