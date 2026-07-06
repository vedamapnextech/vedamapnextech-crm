const Customer = require("../models/Customer");

const getCustomers = async (req, res) => {
    try {
        const { search, status, city } = req.query;

        let filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } },
                { product: { $regex: search, $options: "i" } },
            ];
        }

        if (status) {
            filter.status = status;
        }

        if (city) {
            filter.city = city;
        }

        const customers = await Customer.find(filter).sort({
            createdAt: -1,
        });

        res.json(customers);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const addCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);

        res.status(201).json(customer);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer Not Found",
            });
        }

        res.json(customer);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        if (!customer) {
            return res.status(404).json({
                message: "Customer Not Found",
            });
        }

        res.json(customer);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer Not Found",
            });
        }

        res.json({
            message: "Customer Deleted Successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getCustomers,
    addCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};