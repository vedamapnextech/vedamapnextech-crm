const express = require("express");

const {
  getSupports,
  getSupport,
  createSupport,
  updateSupport,
  deleteSupport,
} = require("../controllers/supportController");

const router = express.Router();

router.get("/", getSupports);

router.get("/:id", getSupport);

router.post("/", createSupport);

router.put("/:id", updateSupport);

router.delete("/:id", deleteSupport);

module.exports = router;