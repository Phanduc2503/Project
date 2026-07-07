const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const adminController = require("../controllers/adminController");

router.get(
    "/",
    auth,
    authAdmin,
    adminController.dashboard
);

module.exports = router;