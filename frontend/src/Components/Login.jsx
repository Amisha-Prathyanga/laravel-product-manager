// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/login", {
//         email,
//         password,
//       });
//       localStorage.setItem("token", response.data.data.token);
//       navigate("/products");
//     } catch (error) {
//       console.error("Login failed:", error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       <button onClick={() => navigate("/register")}>Register</button>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
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

