const User = require("../models/User");
const Breed = require("../models/Breed");
const Category = require("../models/Category");

exports.dashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBreeds = await Breed.countDocuments();
        const totalCategories = await Category.countDocuments();

        res.render("home/adminPage", {
            user: req.session.user,
            totalUsers,
            totalBreeds,
            totalCategories
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};