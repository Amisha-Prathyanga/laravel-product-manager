import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", {
        name,
        email,
        password,
        c_password,
      });

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data.message || "An error occurred. Please try again.",
      });

    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card bg-light p-4 shadow-lg" style={{ width: "24rem" }}>
        <div className="card-body text-center">
          <div className="mb-4">
            <i className="bi bi-person-plus fs-1 text-secondary"></i>
          </div>
          <h2 className="card-title mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
              />
            </div>
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
            <div className="mb-3">
              <input
                type="password"
                placeholder="Confirm Password"
                value={c_password}
                onChange={(e) => setCPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
          <div className="mt-3">
            <button
              onClick={() => navigate("/")}
              className="btn btn-link"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

