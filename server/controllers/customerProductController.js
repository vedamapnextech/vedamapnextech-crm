const CustomerProduct = require("../models/CustomerProduct");

// Get Products of One Customer
const getCustomerProducts = async (req, res) => {
    try {
        const products = await CustomerProduct.find({
            customerId: req.params.customerId,
        }).sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Add Product
const addCustomerProduct = async (req, res) => {
    try {
        const product = await CustomerProduct.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Update Product
const updateCustomerProduct = async (req, res) => {
    try {
        const product = await CustomerProduct.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Delete Product
const deleteCustomerProduct = async (req, res) => {
    try {
        await CustomerProduct.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getCustomerProducts,
    addCustomerProduct,
    updateCustomerProduct,
    deleteCustomerProduct,
};