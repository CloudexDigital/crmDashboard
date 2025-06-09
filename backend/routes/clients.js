// routes/clients.js
const express = require("express");
const router = express.Router();
const Client = require("../models/clients");

router.post("/", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(500).json({ error: "Failed to save client" });
  }
});

router.get("/", async (req, res) => {
  try {
    const clients = await Client.find(); // 🔹 Fetch all clients from MongoDB
    res.json(clients); 
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) return res.status(404).json({ error: "Client not found" });

    res.json(updatedClient); // ✅ Send back updated client
  } catch (err) {
    res.status(500).json({ error: "Failed to update client" });
  }
});


module.exports = router;
