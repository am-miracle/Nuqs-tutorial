export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface SearchParams {
  page?: string;
  search?: string;
  category?: string;
  sort?: string;
}