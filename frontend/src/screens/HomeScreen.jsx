import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchProducts, deleteProduct } from "../services/productService";
import { logout } from "../services/authService";
import ProductForm from "../components/ProductForm";
import SearchAndFilter from "../components/SearchAndFilter";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useAuth();

  useEffect(() => {
    fetchProducts(currentPage, setProducts, setFilteredProducts, setTotalPages);
  }, [currentPage]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, minPrice, maxPrice, products]);

  const applyFilters = () => {
    let filtered = [...products];
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) >= parseFloat(minPrice)
      );
    }
    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) <= parseFloat(maxPrice)
      );
    }
    setFilteredProducts(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setFilteredProducts(products);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts(currentPage, setProducts, setFilteredProducts, setTotalPages);
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    fetchProducts(currentPage, setProducts, setFilteredProducts, setTotalPages);
    handleFormClose();
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    await logout(navigate);

    // navigate("/");
  };

  return (
    <div className="container-fluid px-0">
      <Header onLogout={handleLogout} />
      <div className="container px-4 px-lg-5 mt-5">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          resetFilters={resetFilters}
          setShowForm={setShowForm}
        />
        <ProductGrid
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default HomeScreen;
