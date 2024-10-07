// Header.jsx
import React from "react";
import { LogOut } from "lucide-react";

const Header = ({ onLogout }) => (
  <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="d-flex align-items-center ms-auto">
        <button className="btn btn-outline-danger" onClick={onLogout}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
    <header className="bg-dark py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bolder">Breadcrumbs Product Catalogue</h1>
          <p className="lead fw-normal text-white-50 mb-0">shop as you wish</p>
        </div>
      </div>
    </header>
  </>
);

export default Header;
