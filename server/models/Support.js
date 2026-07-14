const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
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

    location: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },


    complaintType: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },

    engineer: {
      type: String,
      default: "",
    },

    resolutionNotes: {
      type: String,
      default: "",
    },

    ticketSource: {
      type: String,
      required: true,
      trim: true,
    },


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Support", supportSchema);