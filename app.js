require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const breedRoutes = require("./routes/breedRoutes");
const adminRoutes = require("./routes/adminRoutes");


const app = express();

// Kết nối MongoDB
connectDB();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mysecretkey",
        resave: false,
        saveUninitialized: false,
    })
);

// Routes
app.use("/", homeRoutes);
app.use(authRoutes);
app.use(categoryRoutes);
app.use(breedRoutes);
app.use("/admin", adminRoutes);

app.get("/admin-test", (req, res) => {
    console.log("ADMIN TEST HIT");
    res.send("OK ADMIN TEST");
});

// Start server
app.listen(3000, () => {
    console.log("Server running...");
});