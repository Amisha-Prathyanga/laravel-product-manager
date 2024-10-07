import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

const ProductCard = ({ product, onEdit, onDelete }) => (
  <div className="col mb-5">
    <Link
      to={`/products/${product.id}`}
      className="text-decoration-none"
      style={{ color: "inherit" }}
    >
      <div
        className="card h-100 shadow-lg hover-shadow"
        style={{
          transition: "all 0.3s ease-in-out",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <img
          className="card-img-top"
          src={
            product.image || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
          }
          alt={product.name}
          style={{
            height: "200px",
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder mb-3" style={{ color: "#2c3e50" }}>
              {product.name}
            </h5>
            <p
              className="card-text fw-bold mb-2"
              style={{ color: "#2980b9", fontSize: "1.1rem" }}
            >
              ${product.price}
            </p>
            <p
              className="card-text text-muted mb-0"
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.4",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.description}
            </p>
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button
              className="btn btn-outline-primary m-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(product);
              }}
              style={{
                borderRadius: "6px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Pencil size={16} className="me-1" /> Edit
            </button>
            <button
              className="btn btn-outline-danger m-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(product.id);
              }}
              style={{
                borderRadius: "6px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Trash size={16} className="me-1" /> Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

// Add these styles to your CSS file
const styles = `
.hover-shadow:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important;
}

.btn-outline-primary:hover,
.btn-outline-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
}
`;

export default ProductCard;
