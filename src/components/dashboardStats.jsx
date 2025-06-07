import "../styles/dashboardStats.css"

const DashboardStats = () => {
  return (
    <div className="stats-cards">
      <div className="card border-primary">
        <div className="card-content">
          <div className="text">
            <p className="label">Total Clients</p>
            <h3 className="value">0</h3>
          </div>
          <div className="icon bg-indigo">
            <i className="fas fa-users text-primary"></i>
          </div>
        </div>
      </div>

      <div className="card border-success">
        <div className="card-content">
          <div className="text">
            <p className="label">Active Maintenance</p>
            <h3 className="value">0</h3>
          </div>
          <div className="icon bg-green">
            <i className="fas fa-cog text-success"></i>
          </div>
        </div>
      </div>

      <div className="card border-warning">
        <div className="card-content">
          <div className="text">
            <p className="label">Upcoming Renewals</p>
            <h3 className="value">0</h3>
          </div>
          <div className="icon bg-yellow">
            <i className="fas fa-calendar-alt text-warning"></i>
          </div>
        </div>
      </div>

      <div className="card border-secondary">
        <div className="card-content">
          <div className="text">
            <p className="label">Total Revenue</p>
            <h3 className="value">$0</h3>
          </div>
          <div className="icon bg-purple">
            <i className="fas fa-dollar-sign text-secondary"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
