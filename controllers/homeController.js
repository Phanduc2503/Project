exports.index = (req, res) => {
    res.render("home/index", {
        user: req.session.user,
    });
};
