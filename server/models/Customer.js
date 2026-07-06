const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    company: String,

    city: String,

    email: String,

    product: String,

    address: String,

    status: {
      type: String,
      default: "Active",
    },

    quantity: {
      type: Number,
      default: 1,
    },

    unitPrice: {
      type: Number,
      default: 0,
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
      default: "Pending",
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

module.exports = mongoose.model("Customer", customerSchema);