import { useState } from "react";
import Sidebar from "../components/sidenav";
import TopNav from "../components/TopNav";
import "../styles/mainLayout.css";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-layout">
        <TopNav toggleSidebar={toggleSidebar} />
        <main className="main-content">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
