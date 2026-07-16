const express = require("express");

const router = express.Router();

const {
    getInstallations,
    getInstallationById,
    addInstallation,
    updateInstallation,
    deleteInstallation,
    getCustomerInstallations,
    getInstallationsByWBCode,
} = require("../controllers/installationController");

// ==================== Routes ====================a

router.get("/", getInstallations);


router.get("/customer/:customerId", getCustomerInstallations);

router.get("/wb/:wbCode", getInstallationsByWBCode);

router.get("/:id", getInstallationById);

router.post("/", addInstallation);

router.put("/:id", updateInstallation);

router.delete("/:id", deleteInstallation);

module.exports = router;