const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Engineer"],
      default: "Engineer",
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    emergencyContactMobile: {
      type: String,
      trim: true,
    },


    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    address: {
      type: String,
      trim: true,
    },

    remarks: {
      type: String,
      maxlength: 1000,
      trim: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    aadhaarDocument: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);