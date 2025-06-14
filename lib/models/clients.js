import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  fullName: { type: String },
  companyName: { type: String },
  email: { type: String },
  phone: { type: String },
  websiteUrl: { type: String },
  hostingDate: { type: Date },
  maintenanceDate: { type: Date },
  monthlyFee: { type: Number },
  devPrice: { type: Number },
  notes: { type: String },
  status: {
    type: String,
    enum: ["active", "inactive", "pending", "on-hold"],
    default: "active",
  },
  hasMaintenance: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.models.Client || mongoose.model("Clients", clientSchema);
export default Client;

