const express = require("express");

const router = express.Router();

const {
  getCustomerProducts,
  addCustomerProduct,
  updateCustomerProduct,
  deleteCustomerProduct,
} = require("../controllers/customerProductController");

// Get all products of one customer
router.get("/:customerId", getCustomerProducts);

// Add Product
router.post("/", addCustomerProduct);

// Update Product
router.put("/:id", updateCustomerProduct);

// Delete Product
router.delete("/:id", deleteCustomerProduct);

module.exports = router;