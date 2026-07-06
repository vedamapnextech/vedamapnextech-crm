const express = require("express");

const router = express.Router();

const {
    getInstallations,
    getInstallationById,
    addInstallation,
    updateInstallation,
    deleteInstallation,
} = require("../controllers/installationController");

// ==================== Routes ====================a

router.get("/", getInstallations);

router.get("/:id", getInstallationById);

router.post("/", addInstallation);

router.put("/:id", updateInstallation);

router.delete("/:id", deleteInstallation);

module.exports = router;