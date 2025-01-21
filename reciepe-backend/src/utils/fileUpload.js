const multer = require("multer");
const BaseError = require("../error/base.error");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Specify the filename for file uploads
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new BaseError("InvalidFileType", 400, "Invalid file type."));
    } else {
      cb(null, true);
    }
  },
});

module.exports = upload;
