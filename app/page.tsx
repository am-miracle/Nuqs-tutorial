import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';
import { Product } from './types/types';
import { fetchProducts } from '@/lib/actions';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { searchParamsCache } from '@/lib/searchParamsCache';
import { SearchParams } from 'nuqs/server';


export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
    const params = searchParamsCache.parse(await searchParams);
  // Fetch products with typed params
  const { products, totalPages } = await fetchProducts({
    search: params.search,
    category: params.category,
    sort: params.sort,
    page: params.page
  });

  return (
    <main className="container mx-auto p-6">
      <h1 className='text-center text-4xl font-bold mb-6'>Product Listing Page</h1>
      
      <div className="mb-6 flex items-center justify-between gap-4">
        <Suspense fallback={<LoadingSpinner />}>
          <SearchBar />
          <FilterBar />
        </Suspense>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </main>
  );
}