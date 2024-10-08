// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Components/Login";
// import Register from "./Components/Register";
// import ProductList from "./Components/ProductList";
// import ProductDetail from "./Components/ProductDetail";
// import NotFound from "./Components/NotFound";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("token")
//   );

//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem("token");
//       const expirationTime = localStorage.getItem("tokenExpiration");

//       if (token && expirationTime) {
//         const currentTime = new Date().getTime();
//         if (currentTime >= expirationTime) {
//           // Token has expired
//           localStorage.removeItem("token");
//           localStorage.removeItem("tokenExpiration");
//           setIsAuthenticated(false);
//         } else {
//           // Token is valid
//           setIsAuthenticated(true);
//         }
//       } else {
//         setIsAuthenticated(false);
//       }
//     };

//     checkTokenExpiration();
//   }, []);

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={isAuthenticated ? <Navigate to="/products" /> : <Login />}
//       />
//       <Route path="/register" element={<Register />} />
//       <Route
//         path="/products"
//         element={isAuthenticated ? <ProductList /> : <Login />}
//       />
//       <Route
//         path="/products/:id"
//         element={isAuthenticated ? <ProductDetail /> : <Login />}
//       />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";
import NotFound from "./Components/NotFound";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("tokenExpiration");

      if (token && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime >= parseInt(expirationTime)) {
          // Token has expired
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          setIsAuthenticated(false);
        } else {
          // Token is valid
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkTokenExpiration();
    // Set up an interval to check token expiration periodically
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/products" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/products"
        element={isAuthenticated ? <ProductList /> : <Navigate to="/" />}
      />
      <Route
        path="/products/:id"
        element={isAuthenticated ? <ProductDetail /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
