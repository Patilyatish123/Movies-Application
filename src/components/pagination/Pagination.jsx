import React from "react";
import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-container d-flex justify-content-end align-items-center gap-4 text-white w-100 pb-2 pe-3  custom-pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-info"
      >
        Prev
      </button>

      <div className="current-page-display">
        Page {currentPage} of {totalPages}
      </div>

      <button
        className="btn btn-info"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
