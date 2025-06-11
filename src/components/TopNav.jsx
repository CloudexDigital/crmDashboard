import "../styles/topnav.css";
import { useNotifications } from "../context/NotificationContext";
import { useState } from "react";

const TopNav = ({ toggleSidebar }) => {
  const { notifications, hasUnread, clearNotifications } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="topnav">
      <div className="left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h1>Client Dashboard</h1>
      </div>

      <div className="right">
        <div className="notification-wrapper">
          <button className="icon-btn" onClick={toggleDropdown}>
            <i className="fas fa-bell"></i>
            {hasUnread && <span className="notification-dot"></span>}
          </button>

          {showDropdown && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <span>Notifications</span>
                <button onClick={clearNotifications}>Clear All</button>
              </div>
              <div className="dropdown-content">
                {notifications.length === 0 ? (
                  <p className="no-notifications">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="notification-item">
                      {n.message}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="search-wrapper">
          <input type="text" placeholder="Search..." />
          <i className="fas fa-search"></i>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
