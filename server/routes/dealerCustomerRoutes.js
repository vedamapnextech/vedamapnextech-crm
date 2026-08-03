const express = require("express");
const DealerCustomer = require("../models/DealerCustomer");

const {
    getDealerCustomers,
    getDealerCustomerById,
    addDealerCustomer,
    updateDealerCustomer,
    deleteDealerCustomer,
} = require("../controllers/dealerCustomerController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();


// Get single dealer customer
router.get("/customer/:id", authMiddleware, getDealerCustomerById);


router.get("/", authMiddleware, async (req, res) => {
    try {
        const customers = await DealerCustomer.find()
            .populate("dealer", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get all customers of a dealer
router.get("/:dealerId", authMiddleware, getDealerCustomers);


// Add dealer customer
router.post("/", authMiddleware, addDealerCustomer);

// Update dealer customer
router.put("/:id", authMiddleware, updateDealerCustomer);

// Delete dealer customer
router.delete("/:id", authMiddleware, deleteDealerCustomer);

module.exports = router;