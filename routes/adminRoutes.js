const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");
const homeController = require("../controllers/homeController");
const { requireLogin, requireAdmin } = require("../middleware/authMiddleware");

// All admin routes require login + admin role
router.use(requireLogin, requireAdmin);

// Admin dashboard
router.get("/admin", homeController.adminPage);

// User management
router.get("/admin/users", adminUserController.index);
router.get("/admin/users/:id", adminUserController.show);
router.post("/admin/users/:id/role", adminUserController.changeRole);
router.post("/admin/users/:id/status", adminUserController.toggleStatus);
router.post("/admin/users/:id/delete", adminUserController.destroy);

module.exports = router;
