import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onEdit, onDelete }) => (
  <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
    {products.length > 0 ? (
      products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <div className="col-12 text-center">
        <p>No products found matching your criteria.</p>
      </div>
    )}
  </div>
);

export default ProductGrid;