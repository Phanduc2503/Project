const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");
const adminFavoriteController = require("../controllers/adminFavoriteController");
const adminNotificationController = require("../controllers/adminNotificationController");
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

// Favorites management
router.get("/admin/favorites", adminFavoriteController.index);
router.post("/admin/favorites/delete/:id", adminFavoriteController.destroy);
router.post("/admin/favorites/bulk-delete", adminFavoriteController.bulkDestroy);
router.get("/admin/favorites/export/csv", adminFavoriteController.exportCsv);

// Notification management
router.get("/admin/notifications", adminNotificationController.index);
router.post("/admin/notifications/:id/read", adminNotificationController.markAsRead);
router.post("/admin/notifications/read-all", adminNotificationController.markAllAsRead);
router.post("/admin/notifications/clear-all", adminNotificationController.clearAll);
router.post("/admin/notifications/:id/delete", adminNotificationController.destroy);

// Settings
router.get("/admin/settings", (req, res) => {
  res.render("admin/settings", { success: null, error: null });
});
router.post("/admin/settings", async (req, res) => {
  try {
    const { siteName, siteDescription, itemsPerPage } = req.body;
    res.render("admin/settings", { success: "Settings saved successfully!", error: null });
  } catch (err) {
    res.render("admin/settings", { success: null, error: "Failed to save settings." });
  }
});

// Reports
router.get("/admin/reports", homeController.adminReports);

// Global admin search results page
router.get("/admin/search", homeController.adminSearchResults);

module.exports = router;
