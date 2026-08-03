const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        month: {
            type: String,
            required: true,
            trim: true,
        },

        year: {
            type: Number,
            required: true,
        },

        basicSalary: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        incentive: {
            type: Number,
            default: 0,
            min: 0,
        },

        paidAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        pendingAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        netSalary: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["Paid", "Partial", "Pending"],
            default: "Pending",
        },

        remarks: {
            type: String,
            trim: true,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate salary entry for same employee/month/year
salarySchema.index(
    {
        employee: 1,
        month: 1,
        year: 1,
    },
    {
        unique: true,
    }
);

module.exports = mongoose.model("Salary", salarySchema);