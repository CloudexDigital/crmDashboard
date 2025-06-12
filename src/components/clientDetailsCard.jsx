import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/clientDetailsCard.css";

const ClientDetailsModal = ({ isOpen, onClose, client, refreshClients }) => {
  if (!isOpen || !client) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [clientForm, setClientForm] = useState({});

  useEffect(() => {
    setClientForm(client);
  }, [client]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientForm({ ...clientForm, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `/api/clients/${clientForm._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientForm),
        }
      );

      if (!response.ok) throw new Error("Failed to update client");

      const updatedClient = await response.json();

      refreshClients();
      toast.success("Client updated successfully!", { position: "top-right" });
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error updating client:", error);
    }
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
            {/* LEFT SIDE */}
            <section className="modal-left">
              <div className="profile-card">
                <i className="fas fa-user-circle avatar-icon-2"></i>
                {isEditing ? (
                  <>
                    <input
                      className="editable-input"
                      name="fullName"
                      value={clientForm.fullName || ""}
                      onChange={handleChange}
                    />
                    <input
                      className="editable-input"
                      name="companyName"
                      value={clientForm.companyName || ""}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <>
                    <h4>{client.fullName}</h4>
                    <p>{client.companyName}</p>
                  </>
                )}
                <div className={`status-badge2 ${client.status}`}>
                  {isEditing ? (
                    <select
                      className={`status-select ${clientForm.status}`}
                      name="status"
                      value={clientForm.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="onhold">On Hold</option>
                      <option value="pending">Pending</option>
                    </select>
                  ) : (
                    <span
                      className={`status-badge2 ${client.status.toLowerCase()}`}
                    >
                      {client.status}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-info">
                <div className="contact-row">
                  <i className="fas fa-envelope contact-icon" />
                  {isEditing ? (
                    <input
                      className="editable-input-contact"
                      name="email"
                      value={clientForm.email || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{client.email}</p>
                  )}
                </div>
                <div className="contact-row">
                  <i className="fas fa-phone contact-icon" />
                  {isEditing ? (
                    <input
                      className="editable-input-contact"
                      name="phone"
                      value={clientForm.phone || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{client.phone}</p>
                  )}
                </div>
                <div className="contact-row">
                  <i className="fas fa-globe contact-icon" />
                  {isEditing ? (
                    <input
                      className="editable-input-contact"
                      name="websiteUrl"
                      value={clientForm.websiteUrl || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>
                      {client.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* RIGHT SIDE */}
            <section className="modal-right">
              <h4>Project Information</h4>
              <div className="project-grid">
                {[
                  { label: "Hosting Date", name: "hostingDate" },
                  { label: "Next Maintenance", name: "maintenanceDate" },
                  { label: "Monthly Fee", name: "monthlyFee" },
                  { label: "Website Cost", name: "devPrice" },
                  { label: "Maintenance Plan", name: "hasMaintenance" },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label>{label}</label>
                    {isEditing ? (
                      name === "hasMaintenance" ? (
                        <select
                          className="editable-input-right"
                          name="hasMaintenance"
                          value={clientForm.hasMaintenance ? "true" : "false"}
                          onChange={(e) =>
                            setClientForm({
                              ...clientForm,
                              hasMaintenance: e.target.value === "true",
                            })
                          }
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      ) : (
                        <input
                          className="editable-input-right"
                          name={name}
                          value={clientForm[name] || ""}
                          onChange={handleChange}
                        />
                      )
                    ) : (
                      <p>
                        {name.includes("Date")
                          ? formatDate(client[name])
                          : name === "hasMaintenance"
                          ? client[name]
                            ? "Yes"
                            : "No"
                          : client[name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="notes-section">
                <label>Notes</label>
                {isEditing ? (
                  <textarea
                    className="editable-textarea-right"
                    name="notes"
                    value={clientForm.notes || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{client.notes}</p>
                )}
              </div>

              <div className="modal-actions">
                <button onClick={onClose} className="btn-secondary">
                  Close
                </button>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Edit
                  </button>
                ) : (
                  <button onClick={handleSave} className="btn-primary">
                    Save
                  </button>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDetailsModal;
