const multer = require("multer");
const path = require("path");
const fs = require("fs");

const breedDir = path.join(__dirname, "../public/uploads/breeds");

if (!fs.existsSync(breedDir)) {
    fs.mkdirSync(breedDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, breedDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const fileName = "breed-" + Date.now() + ext;
        cb(null, fileName);
    }
});

const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
const allowedExts = [".jpg", ".jpeg", ".png", ".webp"];

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedMimes.includes(file.mimetype) && allowedExts.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg, .jpeg, .png, .webp files are allowed"), false);
    }
};

const uploadBreed = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

module.exports = uploadBreed;
