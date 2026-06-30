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

        await Category.create({

            name,

            description,

        });

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

        await Category.findByIdAndUpdate(

            req.params.id,

            {

                name,

                description

            }

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

        await Category.findByIdAndDelete(req.params.id);

        res.redirect("/categories");

    }

    catch(error){

        console.log(error);

    }

}