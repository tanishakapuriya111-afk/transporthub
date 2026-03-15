import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginModal, RegistrationModal, ForgotPasswordModal } from "./components/auth";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ServicesPage from "./components/pages/ServicesPage";
import ServiceDetailPage from "./components/pages/ServiceDetailPage";
import ContactPage from "./components/pages/ContactPage";
import TrackingPage from "./components/pages/TrackingPage";
import ProfilePage from "./components/pages/ProfilePage";
import BookingPage from "./components/pages/BookingPage";
import MyBookingsPage from "./components/pages/MyBookingsPage";
import AdminBookingsPage from "./components/pages/AdminBookingsPage";
import UserManagement from "./components/pages/admin/UserManagement";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AdminPage from "./components/pages/AdminPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useAuth as useModalAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const {
    showLoginModal,
    showRegisterModal,
    showForgotPasswordModal,
    handleOpenLoginModal,
    handleOpenRegisterModal,
    handleCloseLoginModal,
    handleCloseRegisterModal,
    handleCloseForgotPasswordModal,
    handleSwitchToRegister,
    handleSwitchToLogin,
    handleSwitchToForgotPassword,
    handleBackToLogin,
  } = useModalAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {/* Routes */}
          <Routes>
            <Route path="/" element={<><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><HomePage /></>} />
            <Route path="/about" element={<><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><AboutPage /></>} />
            <Route path="/services" element={<><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><ServicesPage /></>} />
            <Route path="/service/:serviceId" element={<><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><ServiceDetailPage /></>} />
            <Route path="/contact" element={<><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><ContactPage /></>} />
            <Route path="/track" element={<><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><TrackingPage /></>} />
            <Route path="/booking" element={<ProtectedRoute><><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><BookingPage /></></ProtectedRoute>} />
            <Route path="/my-bookings" element={<ProtectedRoute><><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><MyBookingsPage /></></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><AdminDashboard /></></ProtectedRoute>} />
            <Route path="/admin/inquiries" element={<ProtectedRoute requireAdmin={true}><><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><AdminPage /></></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute requireAdmin={true}><><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><AdminBookingsPage /></></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin={true}><><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><UserManagement /></></ProtectedRoute>} />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <><Navbar onOpenLogin={handleOpenLoginModal} onOpenRegister={handleOpenRegisterModal} /><ProfilePage /></>
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* Modals */}
          {showLoginModal && (
            <LoginModal
              onClose={handleCloseLoginModal}
              onSwitchToRegister={handleSwitchToRegister}
              onSwitchToForgotPassword={handleSwitchToForgotPassword}
            />
          )}
          {showRegisterModal && (
            <RegistrationModal onClose={handleCloseRegisterModal} onSwitchToLogin={handleSwitchToLogin} />
          )}
          {showForgotPasswordModal && (
            <ForgotPasswordModal onClose={handleCloseForgotPasswordModal} onBackToLogin={handleBackToLogin} />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
