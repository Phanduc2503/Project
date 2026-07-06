router.get("/user", auth, (req, res) => {
    res.render("user/dashboard", {
        user: req.session.user
    });
});