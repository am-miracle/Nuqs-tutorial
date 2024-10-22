import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';
import { Product, SearchParams } from './types/types';
import { fetchProducts } from '@/lib/actions';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { products, totalPages } = await fetchProducts(searchParams);

  return (
    <main className="container mx-auto p-6">
      <h1 className='text-center text-4xl font-bold mb-6'>Product Listing Page</h1>
      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchBar />
        <FilterBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </main>
  );
}