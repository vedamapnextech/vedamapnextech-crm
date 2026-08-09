const Installation = require("../models/Installation");
const Customer = require("../models/Customer");
const DealerCustomer = require("../models/DealerCustomer");
const mongoose = require("mongoose");




// ==================== Get All Installations ====================

const getInstallations = async (req, res) => {
    try {

        const installations = await Installation.find()
            .populate("product", "name")
            .sort({ createdAt: -1 });

        const data = await Promise.all(
            installations.map(async (installation) => {

                let customer = null;

                if (installation.customerType === "DealerCustomer") {

                    customer = await DealerCustomer.findById(
                        installation.customer
                    ).select("name wbCode");

                } else {

                    customer = await Customer.findById(
                        installation.customer
                    ).select("name wbCode");

                }

                return {
                    ...installation.toObject(),
                    customer,
                };

            })
        );

        res.json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};



// ==================== Get Single Installation ====================

const getInstallationById = async (req, res) => {
    try {

        const installation = await Installation.findById(req.params.id)
            .populate("product");

        if (!installation) {
            return res.status(404).json({
                message: "Installation Not Found",
            });
        }

        let customer = null;

        if (installation.customerType === "DealerCustomer") {

            customer = await DealerCustomer.findById(
                installation.customer
            ).select("name city wbCode");

        } else {

            customer = await Customer.findById(
                installation.customer
            ).select("name city wbCode");

        }

        res.json({
            ...installation.toObject(),
            customer,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};


// ==================== Add Installation ====================

const addInstallation = async (req, res) => {
    try {
        const payload = { ...req.body };

        // Agar manually product name type kiya hai
        if (
            payload.product &&
            !mongoose.Types.ObjectId.isValid(payload.product)
        ) {
            payload.productName = payload.product;
            payload.product = undefined;
        }

        const installation = await Installation.create(payload);

        res.status(201).json(installation);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message || "Server Error",
        });
    }
};

// ==================== Update Installation ====================
const updateInstallation = async (req, res) => {
    try {
        const data = { ...req.body };

        if (
            data.product &&
            mongoose.Types.ObjectId.isValid(data.product)
        ) {
            data.productName = "";
        } else if (data.product) {
            data.productName = data.product;
            delete data.product;
        }

        const installation = await Installation.findByIdAndUpdate(
            req.params.id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!installation) {
            return res.status(404).json({
                message: "Installation Not Found",
            });
        }

        res.json(installation);

    } catch (error) {
        console.log("UPDATE INSTALLATION ERROR:", error);

        res.status(500).json({
            message: error.message || "Server Error",
        });
    }
};

// ==================== Delete Installation ====================

const deleteInstallation = async (req, res) => {

    try {

        const installation = await Installation.findByIdAndDelete(req.params.id);

        if (!installation) {

            return res.status(404).json({

                message: "Installation Not Found",

            });

        }

        res.json({

            message: "Installation Deleted Successfully",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};


const getInstallationsByWBCode = async (req, res) => {
    try {

        const installations = await Installation.find({
            wbCode: req.params.wbCode,
        })
            .populate("product", "name")
            .populate("customer", "name")
            .sort({ installationDate: -1 });

        res.json(installations);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};


const getCustomerInstallations = async (req, res) => {
    try {

        const installations = await Installation.find({
            customer: req.params.customerId,
        }).sort({ createdAt: -1 });

        res.json(installations);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};



module.exports = {
    getInstallations,
    getInstallationById,
    addInstallation,
    updateInstallation,
    deleteInstallation,
    getCustomerInstallations,
    getInstallationsByWBCode,
};