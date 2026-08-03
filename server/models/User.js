const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        pendingEmail: {
            type: String,
            default: null,
        },

        emailOtp: {
            type: String,
            default: null,
        },

        emailOtpExpire: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            enum: ["Admin"],
            default: "Admin",
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
        },

        phone: {
            type: String,
            default: "",
            trim: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        joiningDate: {
            type: Date,
            default: Date.now,
        },

        lastLogin: {
            type: Date,
            default: null,
        },

        resetPasswordToken: {
            type: String,
            default: null,
        },

        resetPasswordExpire: {
            type: Date,
            default: null,
        },
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);