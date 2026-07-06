const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", auth, authAdmin, (req, res) => {
    res.render("home/index", {
        user: req.session.user
    });
});

module.exports = router;