const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

router.get("/", homeController.homePage);

// Static pages
router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/faq", (req, res) => {
  res.render("pages/faq");
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

// Admin search API
router.get("/api/admin/search", homeController.adminSearch);

module.exports = router;