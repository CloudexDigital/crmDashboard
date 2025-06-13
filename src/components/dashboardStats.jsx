import { useState, useEffect } from "react";
import "../styles/dashboardStats.css";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeMaintenance: 0,
    upcomingRenewals: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();
        setStats(data); // ✅ Update state with fetched data
      } catch (error) {
        console.error("Error fetching dashboard stats bro", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="stats-cards">
      <div className="card border-primary">
        <div className="card-content">
          <div className="text">
            <p className="label">Total Clients</p>
            <h3 className="value">{stats.totalClients}</h3>
          </div>
          <div className="icon bg-indigo">
            <i className="fas fa-users text-primary"></i>
          </div>
        </div>
      </div>

      <div className="card border-success">
        <div className="card-content">
          <div className="text">
            <p className="label">Active Maintenance</p>
            <h3 className="value">{stats.activeMaintenance}</h3>
          </div>
          <div className="icon bg-green">
            <i className="fas fa-cog text-success"></i>
          </div>
        </div>
      </div>

      <div className="card border-warning">
        <div className="card-content">
          <div className="text">
            <p className="label">Upcoming Maintenance</p>
            <h3 className="value">{stats.upcomingRenewals}</h3>
          </div>
          <div className="icon bg-yellow">
            <i className="fas fa-calendar-alt text-warning"></i>
          </div>
        </div>
      </div>

      <div className="card border-secondary">
        <div className="card-content">
          <div className="text">
            <p className="label">Total Revenue</p>
            <h3 className="value">R{stats.totalRevenue.toFixed(2)}</h3>
          </div>
          <div className="icon bg-purple">
            <i className="fas fa-dollar-sign text-secondary"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
