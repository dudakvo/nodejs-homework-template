require("dotenv").config();

const multer = require("multer");

const UPLOAD_DIR = process.env.UPLOAD_DIR;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { filesize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});

module.exports = upload;
