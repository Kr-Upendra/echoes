import React, { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [current, setCurrent] = useState(currentPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrent(page);
      onPageChange(page);
    }
  };

  const handleNext = () => {
    if (current < totalPages) {
      handlePageClick(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 1) {
      handlePageClick(current - 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 py-6 space-x-2">
      <button
        className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-500"
        disabled={current === 1}
        onClick={handlePrev}
      >
        <FaLongArrowAltLeft />
      </button>

      {/* Render individual page numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`px-3 py-1 ${
              page === current
                ? "bg-green-500 text-white font-display border border-green-600 hover:bg-green-500"
                : "border border-green-600 hover:bg-green-500"
            } rounded-md`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className="px-3 py-2 rounded-md border border-green-600 hover:bg-green-500"
        disabled={current === totalPages}
        onClick={handleNext}
      >
        <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default Pagination;
