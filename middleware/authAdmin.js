module.exports = (req, res, next) => {

    if (req.session.user.role !== "admin") {

        return res.send("Bạn không có quyền");

    }

    next();

};