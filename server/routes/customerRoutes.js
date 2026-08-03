const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    getCustomers,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    convertLeadToCustomer,
} = require("../controllers/customerController");

router.get("/", authMiddleware, getCustomers);
router.post("/", authMiddleware, addCustomer);
router.get("/:id", authMiddleware, getCustomerById);
router.put("/:id", authMiddleware, updateCustomer);
router.delete("/:id", authMiddleware, deleteCustomer);
router.post("/convert/:id", authMiddleware, convertLeadToCustomer);

module.exports = router;