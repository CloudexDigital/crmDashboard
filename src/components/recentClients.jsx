import "../styles/RecentClients.css";

const RecentClients = () => {
  return (
    <div className="recent-clients-grid">
      {/* Recent Clients Table */}
      <div className="recent-clients-table">
        <div className="table-header">
          <h2>Recent Clients</h2>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Website</th>
                <th>Next Maintenance</th>
                <th>Status</th>
                <th className="sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="no-data">
                  No clients found.{" "}
                  <button className="add-client-btn-card">Add a new client</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div className="upcoming-maintenance">
        <div className="table-header">
          <h2>Upcoming Maintenance</h2>
        </div>
        <div className="maintenance-body">
          <p>No upcoming maintenance tasks</p>
        </div>
      </div>
    </div>
  );
};

export default RecentClients;
