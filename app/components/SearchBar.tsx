'use client'
import { useProductParams } from '@/lib/hooks/useProductParams';
import LoadingSpinner from './LoadingSpinner';

export default function SearchBar() {
  const { search, setSearch, isPending } = useProductParams();

  const handleSearch = (term: string) => {
    setSearch(term);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded-lg text-black"
      />
      {isPending && (
        <div className="absolute right-2 top-2">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
