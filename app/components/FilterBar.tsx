'use client'
import { useProductParams } from '@/lib/hooks/useProductParams';
import LoadingSpinner from './LoadingSpinner';

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rating' }
  ] as const;

type SortOption = typeof sortOptions[number]['value'];

export default function FilterBar() {
  const { category, setCategory, sort, setSort, isPending } = useProductParams();


  const handleCategoryChange = (value: string) => {
      setCategory(value);
  };

  const handleSortChange = (value: SortOption) => {
      setSort(value);
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="p-2 border rounded-lg bg-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value as SortOption)}
        className="p-2 border rounded-lg bg-blue-500"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isPending && <LoadingSpinner />}
    </div>
  );
}