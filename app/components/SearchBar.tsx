'use client'
import { useProductParams } from '@/lib/hooks/useProductParams';

export default function SearchBar() {
  const { search, setSearch } = useProductParams();

  const handleSearch = (term: string) => {
    setSearch(term);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search || ""}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded-lg text-black"
      />
    </div>
  );
}
