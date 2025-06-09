import "../styles/dashboard.css"
import DashboardStats from "../components/dashboardStats";
import RecentClients from "../components/recentClients";

const Dashboard = ({openModal, clients, openDetailsModal}) => {
  return (
    <div className="dashboard">
      <DashboardStats />
      <RecentClients openModal={openModal} clients={clients} openDetailsModal={openDetailsModal}/>
    </div>
  );
};

export default Dashboard;
