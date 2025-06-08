import "../styles/RecentClients.css";

export default function RecentClients({ openModal, clients = [] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingMaintenance = clients.filter((client) => {
    const maintenanceDate = new Date(client.maintenanceDate);
    return maintenanceDate > today;
  });

  return (
    <div className="recent-clients-grid">
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
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">
                    <p>No clients found.</p>
                    <button className="add-client-btn-card" onClick={openModal}>
                      Add a new client
                    </button>
                  </td>
                </tr>
              ) : (
                clients.map((client, i) => (
                  <tr key={i}>
                    <td>{client.fullName}</td>
                    <td>{client.websiteUrl}</td>
                    <td>{new Date(client.maintenanceDate).toLocaleDateString()}</td>
                    <td>{client.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="upcoming-maintenance">
        <div className="table-header">
          <h2>Upcoming Maintenance</h2>
        </div>
        <div className="maintenance-body">
          {upcomingMaintenance.length === 0 ? (
            <p>No upcoming maintenance tasks</p>
          ) : (
            <ul>
              {upcomingMaintenance.map((client, i) => (
                <li key={i}>
                  <strong>{client.fullName}</strong> —{" "}
                  {new Date(client.maintenanceDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
