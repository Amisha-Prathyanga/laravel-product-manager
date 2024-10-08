import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Tag, Package, DollarSign, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success && response.data.data) {
          setProduct(response.data.data);
        } else {
          throw new Error(
            response.data.message || "Failed to retrieve product data"
          );
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="alert alert-info" role="alert">
          No product data available
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        className="btn btn-secondary mb-4 back-button"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          paddingLeft: "1rem",
          paddingRight: "1.25rem",
          transition: "all 0.2s ease",
        }}
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div
        className="bg-white rounded-3 shadow-sm p-4 mb-5"
        style={{ minHeight: "80vh" }}
      >
        <div className="row g-4 h-100">
          <div className="col-lg-6 border-end">
            <div
              className="product-image-container position-sticky"
              style={{ top: "2rem" }}
            >
              <div className="image-wrapper ratio ratio-1x1 rounded-3 overflow-hidden shadow-lg mb-4">
                <img
                  src={product.image || "https://via.placeholder.com/600x600"}
                  alt={product.name}
                  className="object-fit-cover w-100 h-100"
                />
              </div>
              <div className="product-badges d-flex gap-2 mb-3">
                <span className="badge bg-primary">New Arrival</span>
                <span className="badge bg-success">In Stock</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="product-info p-3">
              <div className="d-flex align-items-center mb-4">
                <Package className="text-primary me-2" size={24} />
                <h5 className="text-muted mb-0">SKU: {product.id}</h5>
              </div>

              <h1
                className="display-5 fw-bold mb-4"
                style={{ color: "#2c3e50" }}
              >
                {product.name}
              </h1>

              <div className="pricing-section bg-light p-4 rounded-3 mb-4">
                <div className="d-flex align-items-center">
                  <DollarSign size={24} className="text-success me-2" />
                  <div>
                    <span
                      className="text-muted text-decoration-line-through me-3"
                      style={{ fontSize: "1.1rem" }}
                    >
                      ${parseFloat(product.price * 1.2).toFixed(2)}
                    </span>
                    <span
                      className="text-success"
                      style={{ fontSize: "2rem", fontWeight: "600" }}
                    >
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="badge bg-danger">
                    Save {(0.2 * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="description-section mb-4">
                <h4 className="fw-bold mb-3" style={{ color: "#34495e" }}>
                  Description
                </h4>
                <p
                  className="lead"
                  style={{ lineHeight: "1.8", color: "#555" }}
                >
                  {product.description}
                </p>
              </div>

              <div className="features-section bg-light p-4 rounded-3">
                <h4 className="fw-bold mb-3" style={{ color: "#34495e" }}>
                  Key Features
                </h4>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center mb-2">
                    <Tag size={16} className="text-primary me-2" />
                    Premium Quality
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <Tag size={16} className="text-primary me-2" />
                    Fast Shipping
                  </li>
                  <li className="d-flex align-items-center">
                    <Tag size={16} className="text-primary me-2" />
                    24/7 Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these styles to your CSS file
const styles = `
.product-image-container {
  transition: all 0.3s ease;
}

.image-wrapper img {
  transition: transform 0.3s ease;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.pricing-section {
  border-left: 4px solid #28a745;
}

.features-section {
  border-left: 4px solid #007bff;
}

.description-section {
  border-left: 4px solid #6c757d;
  padding-left: 1rem;
}

.back-button:hover {
  transform: translateX(-5px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
`;

export default ProductDetail;
