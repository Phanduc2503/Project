const express = require("express");
const router = express.Router();

const breedController = require("../controllers/breedController");

// Danh sách Breed
router.get("/breeds", breedController.index);

// Form thêm Breed
router.get("/breeds/create", breedController.create);

// Thêm Breed
router.post("/breeds", breedController.store);

// Form sửa
router.get("/breeds/edit/:id", breedController.edit);

// Cập nhật
router.post("/breeds/update/:id", breedController.update);

// Xóa
router.get("/breeds/delete/:id", breedController.destroy);

module.exports = router;