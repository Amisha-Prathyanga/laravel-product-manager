import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success && response.data.data) {
          setProduct(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to retrieve product data");
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

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  if (!product) return <div className="text-center mt-5">No product data available</div>;

  return (
    <div className="container mt-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-6">
          <div className="product-image-wrapper text-center">
            <img 
              src={product.image || "https://via.placeholder.com/600x700"} 
              alt={product.name} 
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="text-muted mb-2">SKU: {product.id}</h5>
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <div className="mb-4">
            <span className="text-muted text-decoration-line-through me-3 fs-5">
              ${parseFloat(product.price * 1.2).toFixed(2)}
            </span>
            <span className="text-success fs-3 fw-bold">${parseFloat(product.price).toFixed(2)}</span>
          </div>
          <p className="lead mb-4">{product.description}</p>
          
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
