import "../styles/topnav.css";

const TopNav = ({ toggleSidebar }) => {
  return (
    <header className="topnav">
      <div className="left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h1>Client Dashboard</h1>
      </div>

      <div className="right">
        <button className="icon-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-dot"></span>
        </button>

        <div className="search-wrapper">
          <input type="text" placeholder="Search..." />
          <i className="fas fa-search"></i>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
