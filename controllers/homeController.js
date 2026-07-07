const Breed = require("../models/Breed");
const Category = require("../models/Category");

exports.index = async (req, res) => {
    try {
        const totalBreeds = await Breed.countDocuments();
        const totalCategories = await Category.countDocuments();

        const categories = await Category.find().limit(6);

        const featuredBreeds = await Breed.find()
            .populate("categoryId")
            .limit(6);

        res.render("home/homePage", {
            totalBreeds,
            totalCategories,
            categories,
            featuredBreeds,
            user: req.session.user
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
