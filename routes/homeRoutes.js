const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const { requireAdmin } = require("../middleware/authMiddleware");

router.get("/", homeController.homePage);
router.get("/admin", requireAdmin, homeController.adminPage);

module.exports = router;