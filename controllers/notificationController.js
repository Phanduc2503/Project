const Notification = require("../models/Notification");

// Helper to map types to icons
function getIconForType(type) {
  const icons = {
    new_user: "👤",
    new_favorite: "❤️",
    new_breed: "🐾",
    new_category: "📂",
    breed_updated: "✏️",
    category_updated: "📝",
    breed_deleted: "🗑️",
    category_deleted: "🗑️",
    system: "🔔"
  };
  return icons[type] || "🔔";
}

// Helper to create a notification
async function createNotification(type, title, description, link = null) {
  try {
    await Notification.create({
      type,
      title,
      description,
      icon: getIconForType(type),
      link
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}

module.exports.createNotification = createNotification;

// GET /notifications - Get latest 10 notifications (JSON)
module.exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const unreadCount = await Notification.countDocuments({ read: false });

    res.json({
      success: true,
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /notifications/:id/read - Mark one notification as read
module.exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST /notifications/read-all - Mark all as read
module.exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ read: false }, { read: true });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE /notifications/clear-all - Clear all notifications
module.exports.clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET /notifications/unread-count - Get unread count (JSON)
module.exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

