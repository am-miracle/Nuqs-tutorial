'use server'

import { Product, SearchParams } from "@/app/types/types";

export async function fetchProducts(searchParams: SearchParams) {
  const { page = 1, search = '', category = '', sort = '' } = searchParams;
  const limit = 8;
  const offset = (page - 1) * limit;

  let products = await fetch('https://fakestoreapi.com/products')
    .then(res => res.json());

  // Filter by category
  if (category) {
    products = products.filter((product: Product) =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search by title
  if (search) {
    products = products.filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort products
  if (sort) {
    products = products.sort((a: Product, b: Product) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });
  }

  // Paginate results
  const totalPages = Math.ceil(products.length / limit);
  products = products.slice(offset, offset + limit);

  return { products, totalPages };
}