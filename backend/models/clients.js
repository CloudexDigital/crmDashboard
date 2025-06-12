const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  fullName: String,
  companyName: String,
  email: String,
  phone: String,
  websiteUrl: String,
  hostingDate: Date,
  maintenanceDate: Date,
  monthlyFee: Number,
  devPrice: Number,
  notes: String,
  status: {
    type: String,
    enum: ["active", "inactive", "pending", "on-hold"],
    default: "active",
  },
  hasMaintenance: Boolean,
});

module.exports = mongoose.model("Clients", clientSchema);
