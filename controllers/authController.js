const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.send("Sai tài khoản");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("Sai mật khẩu");

    // lưu session
    req.session.user = {
        _id: user._id,
        username: user.username,
        role: user.role,
        
    };

    // 🔥 redirect theo role
    if (user.role === "admin") {
        return res.redirect("/admin");
    }

    return res.redirect("/");
};
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/auth/login");
  });
};