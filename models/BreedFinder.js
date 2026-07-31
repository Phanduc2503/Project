const mongoose = require("mongoose");

const breedFinderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    answers: {
      living: { type: String },
      homeSize: { type: String },
      experience: { type: String },
      family: { type: String },
      children: { type: String },
      otherPets: { type: String },
      exercise: { type: String },
      preferredSize: { type: String },
      energy: { type: String },
      grooming: { type: String },
      purpose: { type: String },
      climate: { type: String },
    },
    results: [
      {
        breedId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Breed",
          required: true,
        },
        score: { type: Number, required: true },
        reason: { type: String },
        aiExplanation: {
          whyFit: { type: String },
          advantages: { type: String },
          disadvantages: { type: String },
          trainingTips: { type: String },
          considerations: { type: String },
        },
      },
    ],
    isSaved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BreedFinder", breedFinderSchema);