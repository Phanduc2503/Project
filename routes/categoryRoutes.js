const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");


// List Categories (user-facing)
router.get("/category", categoryController.index);

router.get("/category/:id", categoryController.detail);

// Admin: List Categories
router.get("/categories", categoryController.adminIndex);

// Show create form
router.get("/categories/create", categoryController.create);

// Create Category
router.post("/categories", categoryController.store);

// Show edit form
router.get("/categories/edit/:id", categoryController.edit);

// Update Category
router.post("/categories/update/:id", categoryController.update);

// Delete Category
router.get("/categories/delete/:id", categoryController.destroy);

module.exports = router;