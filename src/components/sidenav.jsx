import { NavLink } from "react-router-dom";
import "../styles/sidenav.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
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
        <div className="sidebar-content">
          <div>
            <button className="add-client-btn">
              <i className="fas fa-plus"></i>
              <span>Add New Client</span>
            </button>
          </div>

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
             <NavLink
              to="/main"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="fas fa-users"></i> Maintinance
            </NavLink>
             <NavLink
              to="/rep"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <i className="fas fa-users"></i> Reports
            </NavLink>
          </nav>

          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="user-text">
                <p>Admin User</p>
                <p>admin@cloudex.digital</p>
              </div>
            </div>
            <button className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
