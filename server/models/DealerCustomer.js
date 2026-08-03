const mongoose = require("mongoose");

const dealerCustomerSchema = new mongoose.Schema(
    {
        dealer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Dealer",
            required: true,
        },

        wbCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        contactPerson: {
            type: String,
            default: "",
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            default: "",
            trim: true,
        },

        gstNumber: {
            type: String,
            default: "",
            trim: true,
            uppercase: true,
        },

        city: {
            type: String,
            default: "",
            trim: true,
        },

        address: {
            type: String,
            default: "",
            maxlength: 1000,
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },

        customerSince: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("DealerCustomer", dealerCustomerSchema);