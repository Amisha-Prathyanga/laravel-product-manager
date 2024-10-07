// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Pencil, Plus, LogOut, Search, FilterX } from "lucide-react";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products?per_page=8&page=${page}`,
        {
          // Adjust per_page as needed
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
      setTotalPages(response.data.meta.last_page); // Assuming meta contains pagination info
    } catch (error) {
      console.error(
        "Failed to fetch products:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Apply filters whenever search term or price range changes
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
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
  }, [searchTerm, minPrice, maxPrice, products]);

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        Swal.fire("Deleted!", "Product has been deleted.", "success");

        fetchProducts(currentPage);
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to delete product: " +
            (error.response?.data?.message || error.message),
          "error"
        );
      }
    }
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  const handleFormSuccess = () => {
    fetchProducts(currentPage);
    handleFormClose();
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="container-fluid px-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Start Bootstrap
        </a>
        <div className="navbar-nav ml-auto">
          <a className="nav-item nav-link" href="#">
            Home
          </a>
          <a className="nav-item nav-link" href="#">
            About
          </a>
          <a className="nav-item nav-link" href="#">
            Shop
          </a>
          <a className="nav-item nav-link" href="#">
            <i className="bi bi-cart"></i>{" "}
            <span className="badge bg-dark text-white ms-1 rounded-pill">
              0
            </span>
          </a>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop homepage template
            </p>
          </div>
        </div>
      </header>

      <div className="container px-4 px-lg-5 mt-5">
        <div className="row mb-4">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <Plus size={16} /> Add New Product
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">Price Range</span>
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={resetFilters}
              >
                <FilterX size={16} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col mb-5" key={product.id}>
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src={
                      product.image ||
                      "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
                    }
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body p-4">
                    <div className="text-center">
                      <h5 className="fw-bolder">{product.name}</h5>$
                      {product.price}
                    </div>
                  </div>
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <button
                        className="btn btn-outline-primary m-2"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        className="btn btn-outline-danger m-2"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                key={index}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
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

export default ProductList;
