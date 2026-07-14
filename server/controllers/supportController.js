const Support = require("../models/Support");

// Get All Tickets
const getSupports = async (req, res) => {
    try {
        const supports = await Support.find().populate("customer");
        res.json(supports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Ticket
const getSupport = async (req, res) => {
    try {
        const support = await Support.findById(req.params.id).populate("customer");

        if (!support) {
            return res.status(404).json({
                message: "Support Ticket not found",
            });
        }

        res.json(support);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Ticket
const createSupport = async (req, res) => {
    try {
        const support = await Support.create(req.body);

        res.status(201).json(support);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Ticket
const updateSupport = async (req, res) => {
    try {
        const support = await Support.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.json(support);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Ticket
const deleteSupport = async (req, res) => {
    try {
        await Support.findByIdAndDelete(req.params.id);

        res.json({
            message: "Support Ticket deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSupports,
    getSupport,
    createSupport,
    updateSupport,
    deleteSupport,
};