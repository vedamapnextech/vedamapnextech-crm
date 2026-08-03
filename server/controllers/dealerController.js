const Dealer = require("../models/Dealer");

// =========================
// Get All Dealers
// =========================
const getDealers = async (req, res) => {
    try {
        const dealers = await Dealer.find().sort({ createdAt: -1 });
        res.status(200).json(dealers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dealers",
            error: error.message,
        });
    }
};

// =========================
// Get Single Dealer
// =========================
const getDealerById = async (req, res) => {
    try {
        const dealer = await Dealer.findById(req.params.id);

        if (!dealer) {
            return res.status(404).json({
                message: "Dealer not found",
            });
        }

        res.status(200).json(dealer);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dealer",
            error: error.message,
        });
    }
};

// =========================
// Create Dealer
// =========================
const createDealer = async (req, res) => {
    try {
        const dealer = await Dealer.create(req.body);

        res.status(201).json({
            message: "Dealer created successfully",
            dealer,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create dealer",
            error: error.message,
        });
    }
};

// =========================
// Update Dealer
// =========================
const updateDealer = async (req, res) => {
    try {
        const dealer = await Dealer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!dealer) {
            return res.status(404).json({
                message: "Dealer not found",
            });
        }

        res.status(200).json({
            message: "Dealer updated successfully",
            dealer,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update dealer",
            error: error.message,
        });
    }
};

// =========================
// Delete Dealer
// =========================
const deleteDealer = async (req, res) => {
    try {
        const dealer = await Dealer.findByIdAndDelete(req.params.id);

        if (!dealer) {
            return res.status(404).json({
                message: "Dealer not found",
            });
        }

        res.status(200).json({
            message: "Dealer deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete dealer",
            error: error.message,
        });
    }
};

module.exports = {
    getDealers,
    getDealerById,
    createDealer,
    updateDealer,
    deleteDealer,
};