const express = require("express");
const router = express.Router();

const {
    getCustomers,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    convertLeadToCustomer,
} = require("../controllers/customerController");

router.get("/", getCustomers);
router.post("/", addCustomer);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.post("/convert/:id", convertLeadToCustomer);
module.exports = router;