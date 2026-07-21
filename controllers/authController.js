const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Category = require("../models/Category");
const Breed = require("../models/Breed");
const Favorite = require("../models/Favorite");
const Notification = require("../models/Notification");
const { createNotification } = require("./notificationController");
exports.dashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBreeds = await Breed.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalFavorites = await Favorite.countDocuments();

        const recentFavorites = await Favorite.find()
            .populate("userId", "username")
            .populate("breedId", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        const recentBreeds = await Breed.find()
            .populate("categoryId", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        const recentNotifications = await Notification.find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.render("admin/adminPage", {
            user: req.session.user,
            totalUsers,
            totalBreeds,
            totalCategories,
            totalFavorites,
            recentFavorites,
            recentBreeds,
            recentNotifications
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

exports.showLogin = (req, res) => {
  res.render("auth/login", {
    error: null,
    oldData: { username: "" }
  });
};

exports.showRegister = (req, res) => {
  res.render("auth/register",{
    error: null,
    success: null,
    oldData: {
      username: "",
      email: "",
    },
  });
};
exports.index = (req, res) => {
  res.render("home/index", {
    user: req.session.user,
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.render("auth/register", {
        error: "All fields are required",
        success: null,
        oldData: { username: username || "", email: email || "" }
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.render("auth/register", {
        error: "Username or email already exists",
        success: null,
        oldData: { username: username || "", email: email || "" }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await createNotification(
      "new_user",
      "New User Registered",
      `User "${username}" (${email}) has created an account.`,
      "/admin"
    );

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    return res.render("auth/register", {
      error: "Registration failed. Please try again.",
      success: null,
      oldData: req.body
    });
  }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.render("auth/login", {
                error: "Username and password are required",
                oldData: { username: username || "" }
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.render("auth/login", {
                error: "Invalid username or password",
                oldData: { username: username || "" }
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render("auth/login", {
                error: "Invalid username or password",
                oldData: { username: username || "" }
            });
        }

        // Save session
        req.session.user = {
            _id: user._id,
            username: user.username,
            role: user.role,
            avatar: user.avatar
        };

        // Save session explicitly
        req.session.save((err) => {
            if (err) {
                console.log("Session save error:", err);
                return res.render("auth/login", {
                    error: "Login failed due to a server error",
                    oldData: { username }
                });
            }

            // Redirect based on role
            if (user.role === "admin") {
                return res.redirect("/admin");
            }

            return res.redirect("/");
        });

    } catch (err) {
        console.log(err);
        return res.render("auth/login", {
            error: "An error occurred. Please try again.",
            oldData: { username: req.body.username || "" }
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