const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");


router.get("/", favoriteController.index);

router.post("/:breedId", favoriteController.addFavorite);

router.delete("/:breedId", favoriteController.removeFavorite);


module.exports = router;
