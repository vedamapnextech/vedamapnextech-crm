const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: String,
            default: "",
            trim: true,
        },

        city: {
            type: String,
            default: "",
            trim: true,
        },

        interest: {
            type: String,
            default: "",
            trim: true,
        },

        priority: {
            type: String,
            enum: ["High", "Medium", "Low"],
            default: "Medium",
        },

        followUpDate: {
            type: Date,
            default: null,
        },

        remarks: {
            type: String,
            maxlength: 1000,
            default: "",
        },

        address: {
            type: String,
            maxlength: 1000,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "New",
                "Follow-up",
                "Qualified",
                "Converted",
                "Lost",
            ],
            default: "New",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Lead", leadSchema);