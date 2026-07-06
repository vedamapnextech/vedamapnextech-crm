const Installation = require("../models/Installation");

// ==================== Get All Installations ====================

const getInstallations = async (req, res) => {
    try {

        const installations = await Installation.find()
            .populate("customer", "name")
            .populate("product", "name")
            .sort({ createdAt: -1 });

        res.json(installations);

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
            .populate("customer")
            .populate("product");

        if (!installation) {

            return res.status(404).json({

                message: "Installation Not Found",

            });

        }

        res.json(installation);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};


// ==================== Add Installation ====================

const addInstallation = async (req, res) => {

    try {

        const installation = await Installation.create(req.body);

        res.status(201).json(installation);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};


// ==================== Update Installation ====================

const updateInstallation = async (req, res) => {

    try {

        const installation = await Installation.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

            }

        );

        if (!installation) {

            return res.status(404).json({

                message: "Installation Not Found",

            });

        }

        res.json(installation);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

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


module.exports = {
    getInstallations,
    getInstallationById,
    addInstallation,
    updateInstallation,
    deleteInstallation,
};