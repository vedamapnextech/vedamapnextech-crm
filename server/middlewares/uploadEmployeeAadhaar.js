const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/employees");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

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

        fileSize: 200 * 1024, // 200 KB

    },

});

module.exports = uploadEmployeeAadhaar;