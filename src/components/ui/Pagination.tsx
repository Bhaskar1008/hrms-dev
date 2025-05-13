import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const renderPageButtons = () => {
    const buttons = [];
    
    // Always show first page
    if (currentPage > 3) {
      buttons.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="px-3 py-1 rounded text-sm hover:bg-gray-100"
        >
          1
        </button>
      );
      
      // Add ellipsis if needed
      if (currentPage > 4) {
        buttons.push(
          <span key="ellipsis-1" className="px-2 py-1 text-gray-500">...</span>
        );
      }
    }
    
    // Show pages around current page
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === i
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < totalPages - 3) {
      buttons.push(
        <span key="ellipsis-2" className="px-2 py-1 text-gray-500">...</span>
      );
    }
    
    // Always show last page
    if (currentPage < totalPages - 2) {
      buttons.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded text-sm hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }
    
    return buttons;
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-1 rounded hover:bg-gray-100 ${
          currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      {renderPageButtons()}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-1 rounded hover:bg-gray-100 ${
          currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600'
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};