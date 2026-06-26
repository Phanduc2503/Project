const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    homeSize: String,

    lifestyle: String,

    activityLevel: String,

    climate: String,

    familyType: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "UserPreference",
  userPreferenceSchema
);