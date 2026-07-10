const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/avatars");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "avatar-" + Date.now() + ext);
  },
});

const uploadAvatar = multer({ storage });

module.exports = uploadAvatar;