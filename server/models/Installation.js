const mongoose = require("mongoose");

const installationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    wbCode: {
      type: String,
      required: true,
      trim: true,
    },

    siteName: {
      type: String,
      required: true,
      trim: true,
    },

    installationType: {
      type: String,
      enum: ["New Installation", "Replacement", "Upgrade", "Reinstallation"],
      default: "New Installation",
    },


    location: {
      type: String,
      required: true,
    },

    engineer: {
      type: String,
      required: true,
    },

    installationDate: {
      type: Date,
      required: true,
    },

    commissioningDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
        "On Hold",
        "Cancelled",
      ],
      default: "Pending",
    },

    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Installation", installationSchema);