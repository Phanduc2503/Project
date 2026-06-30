const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

const authController = require(
  "../controllers/authController"
);

router.get(
  "/register",
  authController.showRegister
);

router.post(
  "/register",
  authController.register
);

router.get(
  "/login",
  authController.showLogin
);
router.post("/login", authController.login);

router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    user: req.session.user
  });
});
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});



module.exports = router;

