import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/clientList.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedClient, setEditedClient] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/clients");
        if (!response.ok)
          throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleEditClick = (client) => {
    setEditMode(client._id);
    setEditedClient(client);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/clients/${editedClient._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedClient),
        }
      );

      if (!response.ok) throw new Error("Failed to update client");

      const updatedClients = clients.map((client) =>
        client._id === editedClient._id ? editedClient : client
      );
      setClients(updatedClients);
      setEditMode(null);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleChange = (e) => {
    setEditedClient({ ...editedClient, [e.target.name]: e.target.value });
  };

  const filteredClients = clients.filter(
    (client) =>
      client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Client Management</h1>
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>{" "}
          <input
            type="text"
            placeholder="Search clients..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="table-container">
        <table className="client-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Hosting Date</th>
              <th>Maintenance Date</th>
              <th>Monthly Fee</th>
              <th>Dev Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client._id}>
                {editMode === client._id ? (
                  <>
                    <td className="client-info">
                      <i className="fas fa-user-circle avatar-icon"></i>
                      <input
                        name="fullName"
                        value={editedClient.fullName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="companyName"
                        value={editedClient.companyName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="email"
                        value={editedClient.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="phone"
                        value={editedClient.phone}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="websiteUrl"
                        value={editedClient.websiteUrl}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="hostingDate"
                        value={editedClient.hostingDate.split("T")[0]}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="maintenanceDate"
                        value={editedClient.maintenanceDate.split("T")[0]}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="monthlyFee"
                        value={editedClient.monthlyFee}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="devPrice"
                        value={editedClient.devPrice}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name="status"
                        value={editedClient.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleSaveClick} className="btn-save">
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{client.fullName}</td>
                    <td>{client.companyName}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <a href={client.websiteUrl} target="_blank">
                        {client.websiteUrl}
                      </a>
                    </td>
                    <td>{formatDate(client.hostingDate)}</td>
                    <td>{formatDate(client.maintenanceDate)}</td>
                    <td>R{client.monthlyFee}</td>
                    <td>R{client.devPrice}</td>
                    <td>
                      <span className={`status-badge ${client.status}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="action-icons">
                      {/* <Link to={`/client/${client._id}`} className="btn-view"><i className="fas fa-eye"></i> </Link> */}
                      <button
                        onClick={() => handleEditClick(client)}
                        className="btn-edit"
                      >
                        <i className="fas fa-edit"></i>{" "}
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash"></i>{" "}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
