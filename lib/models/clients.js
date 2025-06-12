const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  fullName: {
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
  monthlyFee: {
    type: Number,
    default: 0,
  },
  hasMaintenance: {
    type: Boolean,
    default: false,
  },
  maintenanceDate: {
    type: Date,
    default: null,
  },
  // Add more fields as needed, e.g.
  companyName: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Client || mongoose.model("Clients", clientSchema);

