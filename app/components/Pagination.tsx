'use client'
import LoadingSpinner from './LoadingSpinner';
import { useProductParams } from '@/lib/hooks/useProductParams';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const { page, setPage, isPending } = useProductParams();
  const currentPage = page;

  const handlePageChange = (newPage: number) => {
      setPage(newPage);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          disabled={isPending}
          className={`px-4 py-2 border rounded-lg hover:bg-gray-100 ${
            currentPage === p ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>
      {isPending && <LoadingSpinner />}
    </div>
  );
}