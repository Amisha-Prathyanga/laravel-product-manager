import React from "react";
import { Plus, Search, FilterX } from "lucide-react";

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  resetFilters,
  setShowForm,
}) => (
  <div className="row mb-4">
    <div className="row mb-3">
    <div className="col-md-6">
      <button className="btn btn-dark" onClick={() => setShowForm(true)}>
        <Plus size={16} /> Add New Product
      </button>
    </div>
    </div>
    <div className="row">
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
        <button className="btn btn-dark" onClick={resetFilters}>
          <FilterX size={16} /> Reset
        </button>
      </div>
    </div>
  </div>
  </div>
);

export default SearchAndFilter;
