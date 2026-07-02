require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./config/db");

connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.static("public"));

app.use(require("./routes/authRoutes"));

let favorites = [
    { id: 1, name: "Golden Retriever" },
    { id: 2, name: "Husky" },
    { id: 3, name: "Corgi" }
];

let gallery = [
    {
        id: 1,
        breed: "Golden Retriever",
        image: "https://placedog.net/500"
    },
    {
        id: 2,
        breed: "Husky",
        image: "https://placedog.net/501"
    }
];

let preferences = {
    homeSize: "",
    lifestyle: "",
    activityLevel: "",
    climate: "",
    familyType: ""
};

app.get("/", (req, res) => {
    res.render("index");
});


app.get("/favorites", (req, res) => {
    res.render("favorites", { favorites });
});

app.post("/favorites", (req, res) => {
    favorites.push({
        id: Date.now(),
        name: req.body.name
    });

    res.redirect("/favorites");
});

app.post("/favorites/delete/:id", (req, res) => {
    favorites = favorites.filter(
        favorite => favorite.id != req.params.id
    );

    res.redirect("/favorites");
});

app.get("/gallery", (req, res) => {
    res.render("gallery", { gallery });
});

app.post("/gallery", (req, res) => {
    gallery.push({
        id: Date.now(),
        breed: req.body.breed,
        image: req.body.image
    });

    res.redirect("/gallery");
});

app.post("/gallery/delete/:id", (req, res) => {
    gallery = gallery.filter(
        item => item.id != req.params.id
    );

    res.redirect("/gallery");
});

app.get("/preferences", (req, res) => {
    res.render("preferences", { preferences });
});

app.post("/preferences", (req, res) => {
    preferences = req.body;

    res.redirect("/preferences");
});

app.listen(3000, () => {
  console.log("Server running...");
});