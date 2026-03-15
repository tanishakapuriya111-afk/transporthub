import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MdPerson, MdAdminPanelSettings, MdLogout, MdExpandMore, MdReceipt, MdLocalShipping, MdDashboard, MdEmail } from "react-icons/md";
import "../../styles/Navbar.scss";
import { appConfig } from "../../config/appConfig";
import Logo from "../common/Logo";

const Navbar = ({ onOpenLogin, onOpenRegister }) => {
  const location = useLocation();
  const { currentUser, userData, isAuthenticated, isAdmin, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        <Logo size="medium" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
            About
          </Link>
        </li>
        <li>
          <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>
            Services
          </Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        <span className={`hamburger-line ${showMobileMenu ? "active" : ""}`}></span>
        <span className={`hamburger-line ${showMobileMenu ? "active" : ""}`}></span>
        <span className={`hamburger-line ${showMobileMenu ? "active" : ""}`}></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${showMobileMenu ? "active" : ""}`} ref={mobileMenuRef}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Menu</span>
          <button className="mobile-menu-close" onClick={closeMobileMenu}>
            ✕
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""} onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={location.pathname === "/services" ? "active" : ""}
              onClick={closeMobileMenu}
            >
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
        </ul>

        {isAuthenticated ? (
          <div className="mobile-user-section">
            <div className="mobile-user-info">
              <div className="mobile-user-avatar">
                <span className="mobile-user-initials">{getUserInitials()}</span>
              </div>
              <div className="mobile-user-details">
                <span className="mobile-user-name">{getUserDisplayName()}</span>
                <span className="mobile-user-email">{currentUser?.email}</span>
              </div>
            </div>
            <div className="mobile-user-actions">
              <Link to="/profile" className="mobile-user-action" onClick={closeMobileMenu}>
                <MdPerson className="mobile-action-icon" />
                Profile
              </Link>
              {!isAdmin && (
                <>
                  <Link to="/booking" className="mobile-user-action" onClick={closeMobileMenu}>
                    <MdLocalShipping className="mobile-action-icon" />
                    New Booking
                  </Link>
                  <Link to="/my-bookings" className="mobile-user-action" onClick={closeMobileMenu}>
                    <MdReceipt className="mobile-action-icon" />
                    My Bookings
                  </Link>
                </>
              )}
              {isAdmin && (
                <>
                  <Link to="/admin" className="mobile-user-action" onClick={closeMobileMenu}>
                    <MdDashboard className="mobile-action-icon" />
                    Dashboard
                  </Link>
                  <Link to="/admin/inquiries" className="mobile-user-action" onClick={closeMobileMenu}>
                    <MdEmail className="mobile-action-icon" />
                    Inquiries
                  </Link>
                  <Link to="/admin/bookings" className="mobile-user-action" onClick={closeMobileMenu}>
                    <MdAdminPanelSettings className="mobile-action-icon" />
                    All Bookings
                  </Link>
                  <Link to="/admin/users" className="mobile-user-action" onClick={closeMobileMenu}>
                    <MdAdminPanelSettings className="mobile-action-icon" />
                    User Management
                  </Link>
                </>
              )}
              <button
                className="mobile-user-action logout-action"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <MdLogout className="mobile-action-icon" />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="mobile-auth-buttons">
            <button
              className="mobile-login-btn"
              onClick={() => {
                onOpenLogin();
                closeMobileMenu();
              }}
            >
              Sign In
            </button>
            <button
              className="mobile-register-btn"
              onClick={() => {
                onOpenRegister();
                closeMobileMenu();
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <div className="user-menu-container" ref={userMenuRef}>
            <div className="user-profile" onClick={toggleUserMenu}>
              <div className="user-avatar">{getUserInitials()}</div>
              <span className="user-name">{getUserDisplayName()}</span>
              <MdExpandMore className={`menu-arrow ${showUserMenu ? "rotated" : ""}`} />
            </div>

            <div className={`user-dropdown ${showUserMenu ? "active" : ""}`}>
              <div className="dropdown-header">
                <div className="dropdown-avatar">{getUserInitials()}</div>
                <div className="dropdown-user-info">
                  <span className="dropdown-name">{getUserDisplayName()}</span>
                  <span className="dropdown-email">{currentUser?.email}</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                <MdPerson className="dropdown-icon" />
                My Profile
              </Link>
              
              {!isAdmin && (
                <>
                  <Link to="/booking" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <MdLocalShipping className="dropdown-icon" />
                    New Booking
                  </Link>
                  
                  <Link to="/my-bookings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <MdReceipt className="dropdown-icon" />
                    My Bookings
                  </Link>
                </>
              )}
              
              {isAdmin && (
                <>
                  <Link to="/admin" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <MdDashboard className="dropdown-icon" />
                    Dashboard
                  </Link>
                  
                  <Link to="/admin/inquiries" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <MdEmail className="dropdown-icon" />
                    Inquiries
                  </Link>
                  
                  <Link to="/admin/bookings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <MdAdminPanelSettings className="dropdown-icon" />
                    All Bookings
                  </Link>
                  
                  <Link to="/admin/users" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <MdAdminPanelSettings className="dropdown-icon" />
                    User Management
                  </Link>
                </>
              )}

              <div className="dropdown-divider"></div>

              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <MdLogout className="dropdown-icon" />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <button className="login-btn" onClick={onOpenLogin}>
              Sign In
            </button>
            <button className="register-btn-nav" onClick={onOpenRegister}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
