import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/sidenav";
import TopNav from "../components/TopNav";
import AddClientModal from "../components/clientModal";
import ClientDetailsModal from "../components/clientDetailsCard";
import "../styles/mainLayout.css";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const refreshClients = async () => {
    try {
      setLoading(true); // Show loader
      const response = await fetch("/api/clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error refreshing clients bro:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    refreshClients();
  }, []);

  const openDetailsModal = (client) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedClient(null);
    setIsDetailsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // save
  const handleSave = async (newClient) => {
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        throw new Error(`Failed to save client: ${response.statusText}`);
      }

      // Instead of updating local state manually, just refresh everything:
      await refreshClients();

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save client:", error);
      toast.error("Error saving client");
    }
  };

  // delete
  const handleDelete = async (clientId) => {
    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete client: ${response.statusText}`);
      }

      // Refresh full client list after delete
      await refreshClients();
    } catch (error) {
      console.error("Failed to delete client:", error);
      toast.error("Error deleting client");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return loading ? (
    <div className="app-loader">
      <img src="/favicon_io/favicon-32x32.png" alt="Loading..." />
      <p>Loading dashboard...</p>
    </div>
  ) : (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        openModal={openModal}
      />

      <div className="main-layout">
        <TopNav toggleSidebar={toggleSidebar} />

        <main className="main-content">
          {React.isValidElement(children)
            ? React.cloneElement(children, {
                openModal,
                clients,
                openDetailsModal,
                handleDelete,
              })
            : children}
        </main>

        <AddClientModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
        />
        {/* openDetailsModal */}
        <ClientDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          client={selectedClient}
          setClients={setClients}
          refreshClients={refreshClients}
        />
      </div>
    </>
  );
};

export default MainLayout;
