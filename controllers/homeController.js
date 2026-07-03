const Breed = require("../models/Breed");
const Category = require("../models/Category");

const index = async (req, res) => {
  try {
    const totalBreeds = await Breed.countDocuments();
    const totalCategories = await Category.countDocuments();

    const categories = await Category.find().limit(6);

    const featuredBreeds = await Breed.find()
      .populate("categoryId")
      .limit(6);

    res.render("home/index", {
      totalBreeds,
      totalCategories,
      categories,
      featuredBreeds
    });
  } catch (error) {
    console.error("Lỗi load home:", error);
    res.status(500).send("Lỗi server khi tải trang chủ");
  }
};

module.exports = {
  index
};