const Category = require("../models/Category");
const Breed = require("../models/Breed");
const { createNotification } = require("./notificationController");

exports.index = async (req, res) => {
    try {

        const categories = await Category.find();

        res.render("user/category", {
            categories
        });

    } catch (error) {

        console.log(error);
        res.status(500).send("Server Error");

    }
};
exports.detail = async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);


        if(!category){
            return res.send("Category not found");
        }


        const breeds = await Breed.find({
            categoryId: category._id
        });


        res.render("user/category-detail", {
            category,
            breeds
        });


    } catch(error){

        console.log(error);
        res.status(500).send("Server Error");

    }

};
// Admin controller
exports.adminIndex = async(req,res)=>{

    try{

        const categories = await Category.find();

        res.render("category/list",{
            categories
        });


    }catch(error){

        console.log(error);
        res.status(500).send("Server Error");

    }

};



exports.create = async (req, res) => {
    res.render("category/create");
}

exports.store = async (req, res) => {

    try {

        const { name, description } = req.body;

        if (!name) {

            return res.send("Category name is required");

        }

        const exist = await Category.findOne({
            name
        });

        if (exist) {

            return res.send("Category already exists");

        }

        const newCategory = await Category.create({
            name,
            description,
        });

        await createNotification(
          "new_category",
          "New Category Added",
          `Category "${newCategory.name}" has been created.`,
          "/categories"
        );

        res.redirect("/categories");

    }

    catch (error) {

        console.log(error);

        res.send("Server Error");

    }

};

exports.edit = async (req,res)=>{

    try{

        const category = await Category.findById(req.params.id);

        res.render("category/edit",{

            category

        });

    }

    catch(error){

        console.log(error);

    }

}

exports.update = async (req,res)=>{

    try{

        const {name,description}=req.body;

        const oldCategory = await Category.findById(req.params.id);
        await Category.findByIdAndUpdate(
            req.params.id,
            { name, description }
        );

        await createNotification(
          "category_updated",
          "Category Updated",
          `Category "${oldCategory ? oldCategory.name : req.params.id}" has been updated.`,
          "/categories"
        );

        res.redirect("/categories");

    }

    catch(error){

        console.log(error);

    }

}

exports.destroy = async (req,res)=>{

    try{

        const breed = await Breed.findOne({

            categoryId:req.params.id

        });

        if(breed){

            return res.send("Category is being used");

        }

        const deletedCat = await Category.findById(req.params.id);
        await Category.findByIdAndDelete(req.params.id);

        await createNotification(
          "category_deleted",
          "Category Deleted",
          `Category "${deletedCat ? deletedCat.name : req.params.id}" has been deleted.`,
          "/categories"
        );

        res.redirect("/categories");

    }

    catch(error){

        console.log(error);

    }

}