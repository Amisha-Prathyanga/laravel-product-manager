import React, { useEffect, useState } from "react";
import { LogOut, ShoppingBag, Sparkles } from "lucide-react";
import "./Header.css";

const Header = ({ onLogout }) => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists (in localStorage or localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token"); // or localStorage.getItem('authToken')
    setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
  }, []);

  return (
    <header className="futuristic-header position-relative overflow-hidden bg-dark vw-100">
      {/* Animated background elements */}
      <div className="cyber-grid"></div>

      <div className="container-fluid py-5 position-relative">
        {/* Logout Button */}
        {isLoggedIn && (
          <div className="position-absolute top-0 end-0 p-4 mx-2">
            <button className="btn btn-secondary" onClick={onLogout}>
              <LogOut size={16} className="me-2" /> Logout
            </button>
          </div>
        )}

        {/* Header Content */}
        <div className="text-center text-white position-relative">
          <div className="neon-circle"></div>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <ShoppingBag className="text-primary me-3" size={40} />
            <h1 className="display-4 fw-bolder mb-0 cyber-text">Breadcrumbs</h1>
          </div>
          <h2 className="h2 fw-light text-primary mb-3 cyber-subtext">
            Product Catalogue
          </h2>
          <p className="lead fw-normal text-white-50 mb-0 d-flex align-items-center justify-content-center">
            <Sparkles size={16} className="text-primary me-2" />
            Shop as you wish
            <Sparkles size={16} className="text-primary ms-2" />
          </p>
        </div>
      </div>
    </header>
  );
};


export default Header;
