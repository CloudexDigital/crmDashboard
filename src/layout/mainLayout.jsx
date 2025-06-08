import React from "react";
import { useState } from "react";
import Sidebar from "../components/sidenav";
import TopNav from "../components/TopNav";
import AddClientModal from "../components/clientModal";
import "../styles/mainLayout.css";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (newClient) => {
    setClients((prevClients) => [...prevClients, newClient]); 
    setIsModalOpen(false);
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
            ? React.cloneElement(children, { openModal, clients })
            : children}
        </main>

        <AddClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </>
  );
};

export default MainLayout;
