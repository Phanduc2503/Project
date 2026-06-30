require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false
}));
app.use(authRoutes);


app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.static("public"));

app.use(require("./routes/authRoutes"));

app.listen(3000, () => {
    console.log("Server running...");
});
