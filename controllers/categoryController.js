const Category = require("../models/Category");
const Breed = require("../models/Breed");

exports.index = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        res.render("category/list", { categories });

    } catch (error) {
        console.log(error);

        res.send("Sever Error");
    }
}

exports.create = async (req, res) => {
    res.render("category/create");
}

