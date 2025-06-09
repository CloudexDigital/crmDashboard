const express = require("express");
const router = express.Router();
const Client = require("../models/clients");

router.get("/stats", async (req, res) => {
  try {
    const totalClients = await Client.countDocuments({});
    const activeMaintenance = await Client.countDocuments({ hasMaintenance: true });
    const upcomingRenewals = await Client.countDocuments({
      maintenanceDate: { $gte: new Date() },
    });

    const totalRevenue = await Client.aggregate([
      { $group: { _id: null, total: { $sum: "$monthlyFee" } } },
    ]);

    res.json({
      totalClients,
      activeMaintenance,
      upcomingRenewals,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
