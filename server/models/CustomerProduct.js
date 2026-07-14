const mongoose = require("mongoose");

const customerProductSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        productName: {
            type: String,
            required: true,
            trim: true,
        },

        totalAmount: {
            type: Number,
            default: 0,
        },

        paidAmount: {
            type: Number,
            default: 0,
        },

        pendingAmount: {
            type: Number,
            default: 0,
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Partial", "Paid"],
            default: "Pending",
        },

        remarks: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "CustomerProduct",
    customerProductSchema
);