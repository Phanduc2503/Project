const Breed = require("../models/Breed");
const Category = require("../models/Category");
const { createNotification } = require("./notificationController");

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

        await breed.save();

        await createNotification(
          "new_breed",
          "New Breed Added",
          `Breed "${breed.name}" has been added to the catalog.`,
          "/breeds"
        );

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

        const oldBreed = await Breed.findById(req.params.id);
        await Breed.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        await createNotification(
          "breed_updated",
          "Breed Updated",
          `Breed "${oldBreed ? oldBreed.name : req.params.id}" has been updated.`,
          "/breeds"
        );

        res.redirect("/breeds");

    }

    catch (error) {

        console.log(error);

    }

};

exports.destroy = async (req, res) => {

    try {

        const deletedBreed = await Breed.findById(req.params.id);
        await Breed.findByIdAndDelete(req.params.id);

        await createNotification(
          "breed_deleted",
          "Breed Deleted",
          `Breed "${deletedBreed ? deletedBreed.name : req.params.id}" has been deleted.`,
          "/breeds"
        );

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

