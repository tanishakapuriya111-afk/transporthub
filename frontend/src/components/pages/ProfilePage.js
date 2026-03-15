import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import { MdEdit, MdDelete, MdCameraAlt } from "react-icons/md";
import EditProfileModal from "../auth/EditProfileModal";
import DeleteAccountModal from "../auth/DeleteAccountModal";
import './ProfilePage.scss';

const ProfilePage = () => {
  const { currentUser, userData } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const getUserDisplayName = () => {
    if (userData?.username) return userData.username;
    if (currentUser?.displayName) return currentUser.displayName;
    if (currentUser?.email) return currentUser.email.split("@")[0];
    return "User";
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success('Profile picture updated! (Note: This is demo only, backend upload not implemented)');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your account information</p>
      </div>

      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar-large" onClick={handleImageClick}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                  <span className="profile-initials-large">{getUserInitials()}</span>
                )}
                <div className="avatar-upload-overlay">
                  <MdCameraAlt className="camera-icon" />
                  <span className="upload-text">Change Photo</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{getUserDisplayName()}</h2>
              <p className="profile-email">{currentUser?.email}</p>
              <span className="profile-status">Active Account</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Name</span>
              <span className="detail-value">{getUserDisplayName()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{currentUser?.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Account Created</span>
              <span className="detail-value">
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Recently"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Account Type</span>
              <span className="detail-value">
                <span className={`account-type-badge ${userData?.role || "user"}`}>
                  {userData?.role === "user" && "Standard User"}
                  {userData?.role === "premium" && "Premium User"}
                  {userData?.role === "business" && "Business Account"}
                  {userData?.role === "enterprise" && "Enterprise Account"}
                  {userData?.role === "admin" && "Administrator"}
                  {!userData?.role && "Standard User"}
                </span>
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <div className="action-buttons">
              <button className="btn btn-primary edit-profile-btn" onClick={() => setShowEditModal(true)}>
                <MdEdit style={{verticalAlign: 'middle', marginRight: '8px'}} /> Edit Profile
              </button>
              <button className="btn btn-danger delete-account-btn" onClick={() => setShowDeleteModal(true)}>
                <MdDelete style={{verticalAlign: 'middle', marginRight: '8px'}} /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={() => {
          // Profile updated successfully
          console.log("Profile updated successfully");
        }}
      />

      <DeleteAccountModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </div>
  );
};

export default ProfilePage;
