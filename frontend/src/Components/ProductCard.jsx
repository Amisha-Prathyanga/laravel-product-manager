import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";

const ProductCard = ({ product, onEdit, onDelete }) => (
  <div className="col mb-5">
    <Link to={`/products/${product.id}`}>
      <div className="card h-100">
        <img
          className="card-img-top"
          src={
            product.image || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
          }
          alt={product.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{product.name}</h5>${product.price}
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button
              className="btn btn-outline-primary m-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent link click
                onEdit(product);
              }}
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              className="btn btn-outline-danger m-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent link click
                onDelete(product.id);
              }}
            >
              <Trash size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default ProductCard;
