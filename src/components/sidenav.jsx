import { NavLink } from "react-router-dom";
import "../styles/sidenav.css";

export default function Sidebar({ isOpen, toggleSidebar, openModal }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        id="sidebar"
      >
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-cloud"></i>
            <span>Cloudex Digital</span>
          </div>
          <button className="close-btn" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Make sidebar-content flex-grow and scrollable */}
        <div className="sidebar-content">
          <button className="add-client-btn" onClick={openModal}>
            <i className="fas fa-plus"></i>
            <span>Add New Client</span>
          </button>

          <nav className="sidebar-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </NavLink>
            <NavLink
              to="/client"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="fas fa-users"></i> Clients
            </NavLink>
            <a
              href="https://fennec.aserv.co.za:2096/cpsess9039067129/3rdparty/roundcube/?_task=mail&_mbox=INBOX#"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              <i className="fas fa-envelope"></i> Email
            </a>
          </nav>
        </div>

        {/* Footer outside sidebar-content to stick to bottom */}
        <div className="sidebar-footer">
          <div className="scripture">
            <i className="fas fa-cross"></i>
            <p>
              Philippians 4:11–13 <br /> I can do all things through Christ
              which strengtheneth me.
            </p>
          </div>
          <p className="version-number">v.1.0</p>
        </div>
      </div>
    </>
  );
}
