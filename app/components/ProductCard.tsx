import { Product } from "../types/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="relative h-48 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          className="absolute w-full h-full object-contain"
          width={100}
          height={100}
        />
      </div>
      <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h2>
      <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
      <div className="mt-auto">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price}</span>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{product.rating.rate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}