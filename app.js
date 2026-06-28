require("dotenv").config();

const express = require("express");

const path = require("path");

const app = express();

const connectDB = require("./config/db");
const authRoutes = require("./Route/authRoutes");


connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.static("public"));

// app.use(require("./routes/authRoutes"));
// app.use(require("./routes/categoryRoutes"));
// app.use(require("./routes/breedRoutes"));

app.listen(3000, () => {
    console.log("Server running...");
});
