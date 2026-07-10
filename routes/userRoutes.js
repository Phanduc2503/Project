const express = require("express");
const router = express.Router();

const { requireLogin } = require("../middleware/authMiddleware");

const auth = requireLogin;
const userController = require("../controllers/userController");



router.get("/", auth, userController.index);

router.get("/profile", auth, userController.profile);

router.get("/breeds", auth, userController.userBreeds);



module.exports = router;