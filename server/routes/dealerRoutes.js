const express = require("express");
const router = express.Router();

const {
    getDealers,
    getDealerById,
    createDealer,
    updateDealer,
    deleteDealer,
} = require("../controllers/dealerController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getDealers);
router.get("/:id", authMiddleware, getDealerById);
router.post("/", authMiddleware, createDealer);
router.put("/:id", authMiddleware, updateDealer);
router.delete("/:id", authMiddleware, deleteDealer);

module.exports = router;