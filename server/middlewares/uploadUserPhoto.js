const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "users/profile",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const uploadUserPhoto = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

module.exports = uploadUserPhoto;