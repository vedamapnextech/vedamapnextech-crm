const DealerCustomer = require("../models/DealerCustomer");

// =========================
// Get Dealer Customers
// =========================

const getDealerCustomers = async (req, res) => {
    try {
        const { dealerId } = req.params;

        console.log("Dealer ID:", dealerId);

        const customers = await DealerCustomer.find({
            dealer: dealerId,
        }).populate("dealer", "name");

        console.log("Customers:", customers);

        res.status(200).json(customers);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// =========================
// Get Single Dealer Customer
// =========================
const getDealerCustomerById = async (req, res) => {

    try {

        const customer = await DealerCustomer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Dealer Customer Not Found",
            });
        }

        res.status(200).json(customer);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};

// =========================
// Add Dealer Customer
// =========================
const addDealerCustomer = async (req, res) => {
    try {

        console.log("BODY =>", req.body);

        const existingCustomer = await DealerCustomer.findOne({
            wbCode: req.body.wbCode,
        });

        if (existingCustomer) {
            return res.status(400).json({
                message: "WB Code already exists",
            });
        }

        const customer = await DealerCustomer.create(req.body);

        console.log("CREATED =>", customer);

        res.status(201).json(customer);

    } catch (error) {

        console.log("ERROR =>", error);

        res.status(500).json({
            message: error.message,
        });

    }
};

// =========================
// Update Dealer Customer
// =========================
const updateDealerCustomer = async (req, res) => {

    try {

        const customer = await DealerCustomer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!customer) {
            return res.status(404).json({
                message: "Dealer Customer Not Found",
            });
        }

        res.status(200).json(customer);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};

// =========================
// Delete Dealer Customer
// =========================
const deleteDealerCustomer = async (req, res) => {

    try {

        const customer = await DealerCustomer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Dealer Customer Not Found",
            });
        }

        await DealerCustomer.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Dealer Customer Deleted Successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};

module.exports = {
    getDealerCustomers,
    getDealerCustomerById,
    addDealerCustomer,
    updateDealerCustomer,
    deleteDealerCustomer,
};