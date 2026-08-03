const Customer = require("../models/Customer");
const CustomerProduct = require("../models/CustomerProduct");
const Installation = require("../models/Installation");



const getCustomers = async (req, res) => {
    try {
        const { search, status, city } = req.query;


        let filter = {};

        if (search) {
            filter.$or = [
                { wbCode: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { contactPerson: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } },
                { gstNumber: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
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

        // Same WB Code allow nahi hoga
        const existingCustomer = await Customer.findOne({
            wbCode: req.body.wbCode,
        });

        if (existingCustomer) {
            return res.status(400).json({
                message: "WB Code already exists",
            });
        }

        
        // Manual WB Code save hoga
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

        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer Not Found",
            });
        }

        // Delete all products of this customer
        await CustomerProduct.deleteMany({
            customerId: req.params.id,
        });

        // Delete all installations of this customer
        await Installation.deleteMany({
            customer: req.params.id,
        });

        // Finally delete customer
        await Customer.findByIdAndDelete(req.params.id);

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



const Lead = require("../models/Lead");

const convertLeadToCustomer = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({
                message: "Lead Not Found",
            });

        }

        const customer = await Customer.create({
            wbCode: `WB-${Math.floor(Math.random() * 100000)}`,
            name: lead.name,
            company: lead.company,
            contactPerson: lead.name,
            phone: lead.phone,
            city: lead.city,
            address: lead.address,
            status: "Active",
        });

        await Lead.findByIdAndDelete(req.params.id);

        res.status(201).json(customer);

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
    convertLeadToCustomer,
};