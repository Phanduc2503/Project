const Breed = require("../models/Breed");
const Category = require("../models/Category");
const Favorite = require("../models/Favorite");
const User = require("../models/User");
const BreedFinder = require("../models/BreedFinder");

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

exports.profile = async (req, res) => {

    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.redirect("/login");
        }

        // Get user's favorite breeds for preview
        const favorites = await Favorite.find({
            userId: user._id
        }).populate("breedId")
        .then(data => data.filter(item => item.breedId));

        // Get total counts for stats
        const totalFavorites = favorites.length;
        const totalBreeds = await Breed.countDocuments();

        // Get user's breed finder recommendations
        const recommendations = await BreedFinder.find({
            userId: user._id,
            isSaved: true
        })
        .sort({ createdAt: -1 })
        .limit(4)
        .lean();

        res.render("user/profile", {
            user,
            favorites,
            recommendations,
            totalFavorites,
            totalBreeds
        });
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }

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
