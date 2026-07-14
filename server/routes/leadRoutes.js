const express = require("express");

const router = express.Router();

const {
    getLeads,
    addLead,
    getLeadById,
    updateLead,
    deleteLead,
} = require("../controllers/leadController");

router.get("/", getLeads);

router.post("/", addLead);

router.get("/:id", getLeadById);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

module.exports = router;