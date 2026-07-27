const express = require("express");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// ===== CONNECT DB =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

// ===== IMPORT ROUTES =====
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const breedRoutes = require("./routes/breedRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");

// ===== VIEW ENGINE =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "woofy_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Make currentUser available to all EJS templates
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// ===== ROUTES =====
app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", categoryRoutes);
app.use("/", breedRoutes);
app.use("/user", userRoutes);
app.use("/user/favorites", favoriteRoutes);
app.use("/", notificationRoutes);
app.use("/", adminRoutes);

// ===== SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});