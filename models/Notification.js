const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "new_user",
      "new_favorite",
      "new_breed",
      "new_category",
      "breed_updated",
      "category_updated",
      "breed_deleted",
      "category_deleted",
      "system"
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: "🔔"
  },
  read: {
    type: Boolean,
    default: false
  },
  link: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);