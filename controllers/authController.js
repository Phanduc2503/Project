const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.showLogin = (req, res) => {
  res.render("login");
};

exports.showRegister = (req, res) => {
  res.render("auth/register");
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