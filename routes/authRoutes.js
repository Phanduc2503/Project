const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const uploadAvatar = require("../middleware/uploadAvatar");
const {
  requireLogin,
  requireAdmin,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  requireLogin,
  requireAdmin,
  authController.dashboard
);

router.get("/login", authController.showLogin);
router.get("/register", authController.showRegister);

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/logout", authController.logout);
router.get("/profile", authController.profile);
router.post("/profile/avatar", uploadAvatar.single("avatar"), authController.updateAvatar);


module.exports = router;