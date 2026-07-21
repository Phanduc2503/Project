const Breed = require("../models/Breed");
const Category = require("../models/Category");
const User = require("../models/User");
const Favorite = require("../models/Favorite");

exports.homePage = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).limit(6);

    const featuredBreeds = await Breed.find()
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .limit(6);

    const totalBreeds = await Breed.countDocuments();
    const totalCategories = await Category.countDocuments();

    res.render("home/homePage", {
      categories,
      featuredBreeds,
      totalBreeds,
      totalCategories,
    });
  } catch (error) {
    console.log(error);
    res.render("home/homePage", {
      categories: [],
      featuredBreeds: [],
      totalBreeds: 0,
      totalCategories: 0,
    });
  }
};

exports.adminPage = async (req, res) => {
  try {
    const totalBreeds = await Breed.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalFavorites = await Favorite.countDocuments();

    const recentBreeds = await Breed.find()
      .populate("categoryId")
      .sort({ createdAt: -1 })
      .limit(8);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const recentFavorites = await Favorite.find()
      .populate("userId", "username email")
      .populate("breedId", "name")
      .sort({ createdAt: -1 })
      .limit(6);

    res.render("admin/adminPage", {
      totalBreeds,
      totalCategories,
      totalUsers,
      totalFavorites,
      recentBreeds,
      recentUsers,
      recentFavorites,
    });
  } catch (error) {
    console.log(error);
    res.render("admin/adminPage", {
      totalBreeds: 0,
      totalCategories: 0,
      totalUsers: 0,
      totalFavorites: 0,
      recentBreeds: [],
      recentUsers: [],
      recentFavorites: [],
    });
  }
};