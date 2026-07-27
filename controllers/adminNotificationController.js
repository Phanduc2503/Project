const Notification = require("../models/Notification");

// GET /admin/notifications - List all notifications
exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 20;
    const filter = {};

    // Filter by read/unread
    if (req.query.status === "unread") filter.read = false;
    if (req.query.status === "read") filter.read = true;

    const totalNotifications = await Notification.countDocuments(filter);
    const totalPages = Math.ceil(totalNotifications / perPage);

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    const unreadCount = await Notification.countDocuments({ read: false });

    res.render("admin/notifications", {
      notifications,
      currentPage: page,
      totalPages,
      totalNotifications,
      unreadCount,
      statusFilter: req.query.status || "",
      success: req.query.success || null,
      error: req.query.error || null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// POST /admin/notifications/:id/read - Mark as read
exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /admin/notifications/read-all - Mark all as read
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.redirect("/admin/notifications?success=All notifications marked as read");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/notifications?error=Failed to mark all as read");
  }
};

// POST /admin/notifications/clear-all - Clear all notifications
exports.clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.redirect("/admin/notifications?success=All notifications cleared");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/notifications?error=Failed to clear notifications");
  }
};

// POST /admin/notifications/:id/delete - Delete single notification
exports.destroy = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.redirect("/admin/notifications?success=Notification deleted");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/notifications?error=Failed to delete notification");
  }
};