const Lead = require("../models/Lead");

const getLeads = async (req, res) => {
    try {
        const { search, status, city } = req.query;

        let filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } },
                { interest: { $regex: search, $options: "i" } },
                { remarks: { $regex: search, $options: "i" } },
            ];
        }

        if (status) {
            filter.status = status;
        }

        if (city) {
            filter.city = city;
        }

        const leads = await Lead.find(filter).sort({
            createdAt: -1,
        });

        res.json(leads);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const addLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);

        res.status(201).json(lead);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead Not Found",
            });
        }

        res.json(lead);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead Not Found",
            });
        }

        res.json(lead);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead Not Found",
            });
        }

        res.json({
            message: "Lead Deleted Successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getLeads,
    addLead,
    getLeadById,
    updateLead,
    deleteLead,
};