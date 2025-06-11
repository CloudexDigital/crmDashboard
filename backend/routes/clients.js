const express = require("express");
const router = express.Router();
const Client = require("../models/clients");
const mongoose = require("mongoose");

// ✅ GET all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// ✅ GET client by ID
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid Client ID" });
  }
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch client" });
  }
}); // ✅ CREATE new client
router.post("/", async (req, res) => {
  try {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ error: "Full name and email are required" });
    }
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(500).json({ error: "Failed to save client" });
  }
});

// ✅ UPDATE client by ID
router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid Client ID" });
  }
  try {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res
        .status(400)
        .json({ error: "Full name and email are required" });
    }
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClient)
      return res.status(404).json({ error: "Client not found" });
    res.json(updatedClient);
  } catch (err) {
    res.status(500).json({ error: "Failed to update client" });
  }
}); 

// ✅ DELETE client by ID
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid Client ID" });
  }
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient)
      return res.status(404).json({ error: "Client not found" });
    res.json({ message: "Client deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete client" });
  }
});
module.exports = router;
