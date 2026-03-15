import { useState } from "react";

export const useAuth = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleOpenForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleSwitchToForgotPassword = () => {
    setShowLoginModal(false);
    setShowForgotPasswordModal(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPasswordModal(false);
    setShowLoginModal(true);
  };

  return {
    showLoginModal,
    showRegisterModal,
    showForgotPasswordModal,
    handleOpenLoginModal,
    handleOpenRegisterModal,
    handleOpenForgotPasswordModal,
    handleCloseLoginModal,
    handleCloseRegisterModal,
    handleCloseForgotPasswordModal,
    handleSwitchToRegister,
    handleSwitchToLogin,
    handleSwitchToForgotPassword,
    handleBackToLogin,
  };
};
