import "../styles/dashboard.css"
import DashboardStats from "../components/dashboardStats";
import RecentClients from "../components/recentClients";

const Dashboard = ({openModal, clients, openDetailsModal, handleDelete, refreshClients}) => {
  return (
    <div className="dashboard">
      <DashboardStats />
      <RecentClients openModal={openModal} clients={clients} openDetailsModal={openDetailsModal} handleDelete={handleDelete} refreshClients={refreshClients}/>
    </div>
  );
};

export default Dashboard;
