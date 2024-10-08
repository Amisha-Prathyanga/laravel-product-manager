import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const expirationTime = new Date().getTime() + 3600000; // 1 hour from now

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("tokenExpiration", expirationTime.toString());

      setIsAuthenticated(true); // Update the authentication state

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error.response?.data.message);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Invalid Email or Password",
        text:
          error.response?.data.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card bg-light p-4 shadow-lg" style={{ width: "24rem" }}>
        <div className="card-body text-center">
          <div className="mb-4">
            <i className="bi bi-person-circle fs-1 text-secondary"></i>
          </div>
          <h2 className="card-title mb-4">Member Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="mt-3">
            <button
              onClick={() => navigate("/register")}
              className="btn btn-link"
            >
              Register? Click to sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
