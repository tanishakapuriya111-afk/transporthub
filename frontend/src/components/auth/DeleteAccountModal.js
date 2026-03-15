import { useState } from "react";
import { deleteUserAccount } from "../../services/authService";
import { MdWarning } from "react-icons/md";

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const handleDeleteAccount = async () => {
    // Validate password and confirmation text
    if (!password) {
      setError("Please enter your password to confirm deletion");
      return;
    }

    if (confirmText !== "DELETE") {
      setError("Please type DELETE to confirm account deletion");
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteUserAccount();

      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content delete-account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Delete Account</h2>
          <button className="modal-close-btn" onClick={handleClose} disabled={isDeleting}>
            ×
          </button>
        </div>

        <div className="delete-account-content">
          <div className="warning-icon"><MdWarning /></div>

          <h3 className="warning-title">Are you sure you want to delete your account?</h3>

          <p className="warning-message">This action cannot be undone. All your data, including:</p>

          <ul className="warning-list">
            <li>Profile information</li>
            <li>Account settings</li>
            <li>All associated data</li>
          </ul>

          <p className="warning-message">Will be permanently deleted from our system.</p>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password to confirm"
              required
            />
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type "DELETE" to confirm'
              required
            />
          </div>

          {error && <div className="error-message delete-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={isDeleting}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteAccount}
              disabled={isDeleting || !password || confirmText !== "DELETE"}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
