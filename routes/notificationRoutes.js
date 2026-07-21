const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { requireAdmin } = require("../middleware/authMiddleware");

// All notification routes require admin (only admins see the bell + dashboard)
router.get("/notifications", requireAdmin, notificationController.getNotifications);
router.post("/notifications/:id/read", requireAdmin, notificationController.markAsRead);
router.post("/notifications/read-all", requireAdmin, notificationController.markAllAsRead);
router.delete("/notifications/clear-all", requireAdmin, notificationController.clearAll);
router.get("/notifications/unread-count", notificationController.getUnreadCount);

module.exports = router;