import { useState, useEffect } from "react";
import "../styles/RecentClients.css";

export default function RecentClients({ openModal, openDetailsModal }) {
  const [clients, setClients] = useState([]); // 🔹 Store fetched clients

  // ✅ Fetch clients on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/clients"); // 🔹 Update URL if needed
        if (!response.ok) throw new Error("Failed to fetch clients");

        const data = await response.json();
        setClients(data); // 🔹 Store retrieved clients
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  // ✅ Filter upcoming maintenance clients
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
                <th></th>
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
                    {/* full name and company name*/}
                    <td>
                      <div className="client-info">
                        <i className="fas fa-user-circle avatar-icon"></i>
                        <div>
                          <div className="full-name">{client.fullName}</div>
                          <div className="company-name">
                            {client.companyName}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* company url and hosted date */}
                    <td className="url-table">
                      <div className="company-url">
                        <a
                          href={`https://${
                            client.websiteUrl
                              ? client.websiteUrl.replace(/^https?:\/\//, "")
                              : ""
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {client.websiteUrl
                            ? client.websiteUrl
                                .replace(/^https?:\/\/(www\.)?/, "")
                                .replace(/^www\./, "")
                            : "No Website"}
                        </a>
                      </div>
                      <div className="hosted-date">
                        {new Date(client.hostingDate).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )}
                      </div>
                    </td>
                    {/* maintenance date  */}
                    <td>
                      {client.hasMaintenance ? (
                        <>
                          <div className="maintenance-date">
                            {new Date(
                              client.maintenanceDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <div className="maintenance-status active">
                            Maintenance Active
                          </div>
                        </>
                      ) : (
                        <div className="maintenance-status inactive">
                          No Maintenance
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${client.status}`}>
                        {client.status
                          .replace("-", " ")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="action-icons">
                      <button
                        className="fas fa-eye view-icon"
                        onClick={() => openDetailsModal(client)}
                      ></button>
                      <button
                        className="delete fas fa-trash-alt delete-icon"
                        title="Delete"
                      ></button>
                    </td>
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
            <ul className="maintenance-list">
              {upcomingMaintenance.map((client, i) => {
                const maintenanceDate = new Date(client.maintenanceDate);
                const today = new Date();
                const timeDiff = maintenanceDate - today;
                const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                let dueText = "";
                if (daysDiff === 0) {
                  dueText = "Due Today";
                } else if (daysDiff === 1) {
                  dueText = "Due Tomorrow";
                } else if (daysDiff < 0) {
                  dueText = "Overdue";
                } else {
                  dueText = `Due in ${daysDiff} days`;
                }

                return (
                  <li key={i} className="maintenance-item">
                    <div className="left-section">
                      <i className="fas fa-cog gear-icon"></i>
                      <div className="maintenance-info">
                        <div className="company-name">{client.companyName}</div>
                        <div className="client-name">{client.fullName}</div>
                        <div className="due-date">
                          Due:{" "}
                          {maintenanceDate.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`due-status ${daysDiff <= 5 ? "urgent" : ""}`}
                    >
                      {dueText}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
