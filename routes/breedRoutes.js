const express = require("express");
const router = express.Router();
const uploadBreed = require("../middleware/uploadBreed");

const breedController = require("../controllers/breedController");

// List Breeds
router.get("/breeds", breedController.index);

// Show create form
router.get("/breeds/create", breedController.create);

// Create Breed
router.post("/breeds", uploadBreed.single("image"), breedController.store);

// Show edit form
router.get("/breeds/edit/:id", breedController.edit);

router.get("/breeds/:id", breedController.detail);

// Update
router.post("/breeds/update/:id", uploadBreed.single("image"), breedController.update);

// Delete
router.get("/breeds/delete/:id", breedController.destroy);

router.get("/search", breedController.search);

module.exports = router;