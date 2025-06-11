import { useState } from "react";
import { useContext } from "react";
import { NotificationContext } from '../context/NotificationContext';
import { toast } from "react-toastify";
import "../styles/clientModel.css";

const AddClientModal = ({ isOpen, onClose, onSave }) => {
const { addNotification } = useContext(NotificationContext);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    websiteUrl: "",
    hostingDate: "",
    maintenanceDate: "",
    monthlyFee: "",
    devPrice: "",
    notes: "",
    status: "active",
    hasMaintenance: true,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const client = {
      ...formData,
      websiteUrl: `https://${formData.websiteUrl.replace(/^https?:\/\//, "")}`,
    };

    onSave(client);
    toast.success("Client added successfully!", { position: "top-right" }); // ✅ Toast notification

      addNotification(`New client ${formData.fullName} has been added.`);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Client</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Company Name</label>
            <input
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Website URL</label>
            <div className="url-input">
              <span>https://</span>
              <input
                name="websiteUrl"
                required
                value={formData.websiteUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Hosting Date</label>
            <input
              type="date"
              name="hostingDate"
              required
              value={formData.hostingDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Maintenance Date</label>
            <input
              type="date"
              name="maintenanceDate"
              required
              value={formData.maintenanceDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Monthly Fee</label>
            <input
              type="number"
              name="monthlyFee"
              value={formData.monthlyFee}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Development Price</label>
            <input
              type="number"
              name="devPrice"
              value={formData.devPrice}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label>Notes</label>
            <textarea
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              name="hasMaintenance"
              checked={formData.hasMaintenance}
              onChange={handleChange}
              id="hasMaintenance"
            />
            <label htmlFor="hasMaintenance">Has Maintenance Plan</label>
          </div>

          <div className="form-actions full-width">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
