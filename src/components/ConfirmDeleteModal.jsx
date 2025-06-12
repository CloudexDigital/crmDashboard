import "../styles/confirmDeleteModal.css";

export default function ConfirmDeleteModal({ client, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete <strong>{client.fullName}</strong>?</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
