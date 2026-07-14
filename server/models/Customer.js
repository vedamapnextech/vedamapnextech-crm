const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    // Customer Basic Information
    wbCode: {
      type: String,
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

    // Business Information
    customerType: {
      type: String,
      enum: ["Individual", "Company"],
      default: "Company",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    // Customer Information
    customerSince: {
      type: Date,
      default: Date.now,
    },

   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);