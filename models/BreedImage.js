const mongoose = require("mongoose");

const breedImageSchema = new mongoose.Schema(
  {
    breedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Breed",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BreedImage", breedImageSchema);