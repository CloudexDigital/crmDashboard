import "../styles/dashboard.css"
import DashboardStats from "../components/dashboardStats";
import RecentClients from "../components/recentClients";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardStats />
      <RecentClients/>
    </div>
  );
};

export default Dashboard;
