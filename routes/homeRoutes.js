const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

// Trang chủ
router.get("/", (req, res) => {
    res.render("home/homePage", {
        user: req.session.user
    });
});

module.exports = router;