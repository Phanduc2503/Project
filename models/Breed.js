const mongoose = require("mongoose");

const breedSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },

        originCountry: {
            type: String,
            required: true,
        },

        lifeExpectancy: {
            type: Number,
            required: true,
        },

        temperament: {
            type: String,
        },

        behavior: {
            type: String,
        },

        careRequirements: {
            type: String,
        },

        description: {
            type: String,
        },

        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Breed", breedSchema);