const Favorite = require("../models/Favorite");
const { createNotification } = require("./notificationController");

// Display list of favorites
exports.index = async (req, res) => {
    try {

        if (!req.session.user) {
            return res.redirect("/login");
        }

        const favorites = await Favorite.find({
            userId: req.session.user._id
        }).populate("breedId")
        .then(data => data.filter(item => item.breedId));

        res.render("user/favorites", {
            favorites
        });

    } catch (error) {
        console.log(error);
        res.send("Server Error");
    }
};


// Add favorite
exports.addFavorite = async (req, res) => {
    try {

        const userId = req.session.user._id;
        const breedId = req.params.breedId;

        const exist = await Favorite.findOne({
            userId,
            breedId
        });

        if (exist) {
            return res.json({
                success: false,
                message: "Already exists"
            });
        }

        const fav = await Favorite.create({
            userId,
            breedId
        });

        // Populate breed to get name for notification
        const populatedFav = await Favorite.findById(fav._id).populate("breedId");
        const breedName = populatedFav && populatedFav.breedId ? populatedFav.breedId.name : "a breed";

        await createNotification(
          "new_favorite",
          "New Favorite Added",
          `User added "${breedName}" to their favorites.`,
          "/user/favorites"
        );

        res.json({
            success: true
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false
        });
    }
};


// Delete favorite
exports.removeFavorite = async (req, res) => {
    

    try {

        if (!req.session.user) {

            return res.status(401).json({
                success:false,
                message:"Not logged in"
            });

        }


        const userId = req.session.user._id;

        const breedId = req.params.breedId;


        await Favorite.findOneAndDelete({
            userId,
            breedId
        });


        res.json({
            success:true
        });


    } catch(error){

        console.log(error);

        res.status(500).json({
            success:false
        });

    }

};