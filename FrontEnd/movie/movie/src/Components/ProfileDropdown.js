import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiSettings, FiHelpCircle, FiLogOut, FiChevronDown } from "react-icons/fi";
import "./ProfileDropdown.css";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  const getInitials = (name) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
  };

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <button
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User profile menu"
        aria-expanded={isOpen}
      >
        <div className="profile-avatar">
          {user?.name ? getInitials(user.name) : <FiUser />}
        </div>
        <FiChevronDown className={`chevron ${isOpen ? "open" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="profile-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="profile-header">
              <div className="profile-avatar-large">
                {user?.name ? getInitials(user.name) : <FiUser />}
              </div>
              <div className="profile-info">
                <h4>{user?.name || "Guest User"}</h4>
                <p>{user?.email || "guest@moviemate.com"}</p>
              </div>
            </div>

            <div className="profile-menu">
              <button
                className="profile-menu-item"
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                <FiUser /> My Profile
              </button>
              <button
                className="profile-menu-item"
                onClick={() => {
                  navigate("/settings");
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                <FiSettings /> Settings
              </button>
              <button
                className="profile-menu-item"
                onClick={() => {
                  navigate("/service");
                  setIsOpen(false);
                }}
                role="menuitem"
              >
                <FiHelpCircle /> Help Center
              </button>
              <div className="profile-divider" />
              <button
                className="profile-menu-item logout"
                onClick={handleLogout}
                role="menuitem"
              >
                <FiLogOut /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
