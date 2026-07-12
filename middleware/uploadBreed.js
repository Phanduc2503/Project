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
        const ext = path.extname(file.originalname);
        const fileName = "breed-" + Date.now() + ext;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ được upload file ảnh"), false);
    }
};

const uploadBreed = multer({
    storage,
    fileFilter
});

module.exports = uploadBreed;