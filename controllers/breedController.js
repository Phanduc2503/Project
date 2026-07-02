const Breed = require("../models/Breed");
const Category = require("../models/Category");

exports.index = async (req, res) => {
    try {

        const breeds = await Breed.find()
            .populate("categoryId")
            .sort({ createdAt: -1 });

        res.render("breed/list", {
            breeds
        });

    } catch (error) {

        console.log(error);

        res.send("Server Error");

    }
};

exports.create = async (req, res) => {
    try {
        const categories = await Category.find();

        console.log(categories); // kiểm tra có dữ liệu không

        res.render("breed/create", {
            categories
        });

    } catch (error) {
        console.log(error);
    }
};

exports.store = async (req, res) => {
    try {
        console.log("Before create");
        console.log(req.body);

        const breed = new Breed(req.body);

        console.log("Model created");

        await breed.save();

        console.log("Saved");

        res.redirect("/breeds");

    } catch (error) {
        console.log("ERROR:");
        console.log(error);
        res.status(500).send(error.message);
    }
};

exports.edit = async (req, res) => {

    try {

        const breed = await Breed.findById(req.params.id);

        const categories = await Category.find();

        res.render("breed/edit", {

            breed,

            categories

        });

    }

    catch (error) {

        console.log(error);

    }

};

exports.update = async (req, res) => {

    try {

        await Breed.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.redirect("/breeds");

    }

    catch (error) {

        console.log(error);

    }

};

exports.destroy = async (req, res) => {

    try {

        await Breed.findByIdAndDelete(req.params.id);

        res.redirect("/breeds");

    }

    catch (error) {

        console.log(error);

    }

};

exports.detail = async (req, res) => {

    try {

        const breed = await Breed.findById(req.params.id)
            .populate("categoryId");

        if (!breed) {
            return res.status(404).send("Breed not found");
        }

        res.render("breed/detail", {
            breed
        });

    } catch (error) {

        console.log(error);

        res.status(500).send("Server Error");

    }

};

exports.search = async (req, res) => {
    try {

        const {
            name,
            country,
            temperament,
            category
        } = req.query;

        let filter = {};

        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }

        if (country) {
            filter.originCountry = {
                $regex: country,
                $options: "i"
            };
        }

        if (temperament) {
            filter.temperament = {
                $regex: temperament,
                $options: "i"
            };
        }

        if (category) {
            filter.categoryId = category;
        }

        const breeds = await Breed.find(filter)
            .populate("categoryId");

        const categories = await Category.find();

        res.render("breed/search", {
            breeds,
            categories
        });

    } catch (error) {

        console.log(error);

        res.send("Server Error");

    }
};
