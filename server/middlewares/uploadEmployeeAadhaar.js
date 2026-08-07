const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        const isPdf = file.mimetype === "application/pdf";

        return {
            folder: "employees/aadhaar",
            resource_type: isPdf ? "raw" : "image",
            format: isPdf ? "pdf" : undefined,
        };
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, JPG, JPEG and PNG files are allowed."), false);
    }
};

const uploadEmployeeAadhaar = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = uploadEmployeeAadhaar;