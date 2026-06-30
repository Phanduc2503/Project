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

        res.render("breed/create", {
            categories
        });

    } catch (error) {

        console.log(error);

    }

};

exports.store = async (req, res) => {

    try {

        const {

            categoryId,

            name,

            originCountry,

            lifeExpectancy,

            temperament,

            behavior,

            careRequirements,

            description,

            image

        } = req.body;

        await Breed.create({

            categoryId,

            name,

            originCountry,

            lifeExpectancy,

            temperament,

            behavior,

            careRequirements,

            description,

            image

        });

        res.redirect("/breeds");

    }

    catch (error) {

        console.log(error);

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

const express = require("express");

const router = express.Router();

const breedController = require("../controllers/breedController");

router.get("/breeds", breedController.index);

router.get("/breeds/create", breedController.create);

router.post("/breeds", breedController.store);

router.get("/breeds/edit/:id", breedController.edit);

router.post("/breeds/update/:id", breedController.update);

router.get("/breeds/delete/:id", breedController.destroy);

module.exports = router;