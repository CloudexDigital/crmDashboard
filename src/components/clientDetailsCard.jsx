import "../styles/clientDetailsCard.css";

const ClientDetailsModal = ({ isOpen, onClose, onEdit, client }) => {
  if (!isOpen || !client) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container" role="document">
        <header className="modal-header">
          <h3 className="modal-title">Client Details</h3>
          <button
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <main className="modal-body">
          <div className="modal-flex">
            <section className="modal-left">
              <div className="profile-card">
                <i className="fas fa-user-circle avatar-icon-2"></i>
                <h4>{client.fullName}</h4>
                <p>{client.companyName}</p>
                <div className={`status-badge2 ${client.status}`}>
                  {client.status
                    .replace("-", " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </div>
              </div>

              <div className="contact-info">
                <div className="contact-row">
                  <i className="fas fa-envelope contact-icon" />
                  <p>{client.email}</p>
                </div>
                <div className="contact-row">
                  <i className="fas fa-phone contact-icon" />
                  <p>{client.phone}</p>
                </div>
                <div className="contact-row">
                  <i className="fas fa-globe contact-icon" />
                  <p>
                    {client.websiteUrl
                      .replace(/^https?:\/\/(www\.)?/, "")
                      .replace(/^www\./, "")}
                  </p>
                </div>
              </div>
            </section>

            <section className="modal-right">
              <h4>Project Information</h4>
              <div className="project-grid">
                <div>
                  <label>Hosting Date</label>
                  <p>{formatDate(client.hostingDate)}</p>
                </div>
                <div>
                  <label>Next Maintenance</label>
                  <p>{formatDate(client.maintenanceDate)}</p>
                </div>
                <div>
                  <label>Monthly Fee</label>
                  <p>R{" "}{client.monthlyFee}</p>
                </div>
                <div>
                  <label>Website Cost</label>
                  <p>R{" "}{client.devPrice}</p>
                </div>
                <div>
                  <label>Maintenance Plan</label>
                  <p>{client.hasMaintenance ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="notes-section">
                <label>Notes</label>
                <p>{client.notes}</p>
              </div>

              <div className="modal-actions">
                <button onClick={onClose} className="btn-secondary">
                  Close
                </button>
                <button onClick={onEdit} className="btn-primary">
                  Edit
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
