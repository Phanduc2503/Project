const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Category = require("../models/Category");
exports.dashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBreeds = await Breed.countDocuments();
        const totalCategories = await Category.countDocuments();

        res.render("admin/adminPage", {
            user: req.session.user,
            totalUsers,
            totalBreeds,
            totalCategories
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

exports.showLogin = (req, res) => {
  res.render("auth/login", {
    error: null
  });
};

exports.showRegister = (req, res) => {
  res.render("auth/register",{
    error: null,
    success: null,
    oldData: {
      username: "",
      email: "",
      password: "",
    },
  });
};
exports.index = (req, res) => {
  res.render("home/index", {
    user: req.session.user,
  });
};

exports.register = async (req, res) => {
  const { username, email, password } =
    req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.redirect("/login");
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.render("auth/login", {
                error: "Sai tài khoản",
                oldData: { username }
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("auth/login", {
                error: "Sai mật khẩu",
                oldData: { username }
            });
        }

        // Lưu session
        req.session.user = {
            _id: user._id,
            username: user.username,
            role: user.role,
            avatar: user.avatar
        };

        // Chuyển hướng theo quyền
        if (user.role === "admin") {
            return res.redirect("/admin");
        }

        return res.redirect("/");

    } catch (err) {
        console.log(err);
        return res.render("auth/login", {
            error: "Có lỗi xảy ra",
            oldData: {}
        });
    }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
};
exports.profile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.user._id);

    res.render("auth/profile", {
      user,
      currentUser: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.redirect("/login");
    }

    if (req.file) {
      user.avatar = "/uploads/avatars/" + req.file.filename;
      await user.save();

      req.session.user.avatar = user.avatar;
    }

    res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};