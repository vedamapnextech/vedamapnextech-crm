const uploadEmployeePhoto = require("../middlewares/uploadEmployeePhoto");
const uploadEmployeeAadhaar = require("../middlewares/uploadEmployeeAadhaar");
const express = require("express");

const router = express.Router();

const {
    getEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} = require("../controllers/employeeController");

router.get("/", getEmployees);

router.get("/:id", getEmployeeById);



router.post(
    "/upload-photo",
    uploadEmployeePhoto.single("profilePhoto"),
    (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                message: "No image uploaded.",
            });

        }

        res.json({

            imageUrl: `/uploads/employees/${req.file.filename}`,

        });

    }
);


router.post(
    "/upload-aadhaar",
    uploadEmployeeAadhaar.single("aadhaarDocument"),
    (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                message: "No Aadhaar uploaded.",
            });

        }

        res.json({

            documentUrl: `/uploads/employees/${req.file.filename}`,

        });

    }
);


router.post("/", addEmployee);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;