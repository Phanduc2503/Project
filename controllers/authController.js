const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.showLogin = (req, res) => {
  res.render("login");
};

exports.showRegister = (req, res) => {
  res.render("register");
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
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if(!user){
    return res.redirect("/login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.redirect("/login");
  }
  req.session.user = user;
  res.redirect("/");
};