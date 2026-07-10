const Breed = require("../models/Breed");
const Category = require("../models/Category");
const Favorite = require("../models/Favorite");

exports.index = async (req, res) => {

    const totalBreeds = await Breed.countDocuments();

    const totalCategories = await Category.countDocuments();

    const featuredBreeds = await Breed.find().limit(6);

    res.render("user/index", {
        user: req.session.user,
        totalBreeds,
        totalCategories,
        featuredBreeds
    });
};

exports.profile = (req, res) => {

    res.render("user/profile", {
        user: req.session.user
    });

};

exports.userBreeds = async (req, res) => {
    try {
        const breeds = await Breed.find().populate("categoryId");

        const categories = await Category.find();

        res.render("user/breeds", {
            breeds,
            categories,
            keyword: "",
            user: req.session.user
        });

    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
};
