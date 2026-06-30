const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

// Danh sách Category
router.get("/categories", categoryController.index);

// Hiển thị form thêm
router.get("/categories/create", categoryController.create);

// Thêm Category
router.post("/categories", categoryController.store);

// Hiển thị form sửa
router.get("/categories/edit/:id", categoryController.edit);

// Cập nhật Category
router.post("/categories/update/:id", categoryController.update);

// Xóa Category
router.get("/categories/delete/:id", categoryController.destroy);

module.exports = router;