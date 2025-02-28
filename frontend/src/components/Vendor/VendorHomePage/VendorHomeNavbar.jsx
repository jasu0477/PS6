import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorHomeNavbar = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const navigate = useNavigate();

  const handleToggleClick = () => {
    setPendingStatus(!isOnline); // Store the new state temporarily
    setShowConfirm(true);
  };

  const confirmToggle = (confirm) => {
    if (confirm) {
      setIsOnline(pendingStatus); // Apply the change
    }
    setShowConfirm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    localStorage.removeItem("user"); // Remove stored user info
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#131926] bg-opacity-90 backdrop-blur-md p-6 flex items-center justify-between shadow-lg fixed top-0 w-full z-50">
        {/* Logo */}
        <div className="text-3xl font-bold text-primary cursor-pointer hover:scale-105 transition-transform">
          HandyGo
        </div>

        {/* Centered Navigation Buttons */}
        <div className="flex gap-10 text-lg">
          <button
            onClick={() => navigate("/vendor/home")}
            className="hover:text-primary transition-all duration-300 hover:scale-110"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/vendor/notifications")}
            className="hover:text-primary transition-all duration-300 hover:scale-110"
          >
            Notifications
          </button>
          <button
            onClick={() => navigate("/vendor/profile")}
            className="hover:text-primary transition-all duration-300 hover:scale-110"
          >
            Profile
          </button>
          <button
            onClick={() => navigate("/vendor/help")}
            className="hover:text-primary transition-all duration-300 hover:scale-110"
          >
            Help
          </button>
        </div>

        {/* Online/Offline Toggle and Logout */}
        <div className="flex items-center gap-6">
          {/* Online/Offline Toggle */}
          <div className="flex items-center gap-3">
            <span className={`text-lg font-semibold ${isOnline ? "text-green-400" : "text-red-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
            <button
              onClick={handleToggleClick}
              className="relative w-12 h-6 bg-gray-700 rounded-full transition-all duration-300 hover:scale-110"
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-md ${
                  isOnline ? "translate-x-6 bg-green-400" : "bg-gray-300"
                }`}
              ></div>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg transition hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-white mb-4">
              Are you sure you want to go {pendingStatus ? "Online" : "Offline"}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => confirmToggle(true)}
                className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => confirmToggle(false)}
                className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorHomeNavbar;
