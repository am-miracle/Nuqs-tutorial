'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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
  ];

  const handleFilter = (type: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(type, value);
      } else {
        params.delete(type);
      }
      params.set('page', '1'); // Reset to first page on filter change
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={searchParams.get('category') || ''}
        onChange={(e) => handleFilter('category', e.target.value)}
        className="p-2 border rounded-lg bg-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select
        value={searchParams.get('sort') || ''}
        onChange={(e) => handleFilter('sort', e.target.value)}
        className="p-2 border rounded-lg bg-blue-500"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {isPending && <div>Loading...</div>}
    </div>
  );
}