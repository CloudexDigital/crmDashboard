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

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // 🔹 Force re-render key

  const refreshClients = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/clients");
      console.log("Response status:", response.status); // ✅ Debugging
      const data = await response.json();
      console.log("Fetched Clients:", data); // ✅ Debugging
      setClients(data);
    } catch (error) {
      console.error("Error refreshing clients:", error);
    }
  };

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

  const handleSave = async (newClient) => {
    try {
      const response = await fetch("http://localhost:4000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        throw new Error(`Failed to save client: ${response.statusText}`);
      }

      const savedClient = await response.json();
      setClients((prevClients) => [...prevClients, savedClient]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save client:", error);
      toast.error("Error saving client");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
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
