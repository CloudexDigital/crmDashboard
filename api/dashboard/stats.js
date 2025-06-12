import { connectToDatabase } from "../../lib/dbConnect"; 
import Client from "../../lib/models/clients";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await connectToDatabase();

  try {
    const totalClients = await Client.countDocuments({});
    const activeMaintenance = await Client.countDocuments({ hasMaintenance: true });
    const upcomingRenewals = await Client.countDocuments({
      maintenanceDate: { $gte: new Date() },
    });

    const totalRevenueAgg = await Client.aggregate([
      { $group: { _id: null, total: { $sum: "$monthlyFee" } } },
    ]);

    res.status(200).json({
      totalClients,
      activeMaintenance,
      upcomingRenewals,
      totalRevenue: totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
}
