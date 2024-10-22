'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSearch = (term: string) => {
    setSearch(term);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // Reset to first page on new search
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-1/2">
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded-lg"
      />
      {isPending && (
        <div className="absolute right-2 top-2">Loading...</div>
      )}
    </div>
  );
}