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

module.exports = router;
