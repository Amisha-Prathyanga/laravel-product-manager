import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./Components/Register";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} /> 
    </Routes>
  );
};

export default App;
