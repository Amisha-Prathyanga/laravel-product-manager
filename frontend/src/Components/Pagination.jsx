import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <nav>
    <ul className="pagination justify-content-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <li
          className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          key={index}
        >
          <button className="page-link" onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default Pagination;
