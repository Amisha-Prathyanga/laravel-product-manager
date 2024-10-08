import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";
import NotFound from "./Components/NotFound";

const App = () => {
  const isAuthenticated = sessionStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/products" /> : <Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
