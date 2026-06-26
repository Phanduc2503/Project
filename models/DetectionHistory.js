const mongoose = require("mongoose");

const detectionHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    breedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Breed",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DetectionHistory",
  detectionHistorySchema
);