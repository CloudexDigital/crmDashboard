import "../styles/dashboard.css"
import DashboardStats from "../components/dashboardStats";
import RecentClients from "../components/recentClients";

const Dashboard = ({openModal, clients}) => {
  return (
    <div className="dashboard">
      <DashboardStats />
      <RecentClients openModal={openModal} clients={clients}/>
    </div>
  );
};

export default Dashboard;
