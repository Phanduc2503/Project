const Favorite = require("../models/Favorite");

// Hiển thị danh sách
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


// Thêm favorite
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
                message: "Đã tồn tại"
            });
        }

        await Favorite.create({
            userId,
            breedId
        });

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


// Xóa favorite
exports.removeFavorite = async (req, res) => {
    

    try {

        if (!req.session.user) {

            return res.status(401).json({
                success:false,
                message:"Chưa đăng nhập"
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