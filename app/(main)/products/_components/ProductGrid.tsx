import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { Leaf } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  // onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
  products,
  // onAddToCart,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
        <Leaf size={48} className="mb-4 opacity-30" />
        <p className="text-lg font-semibold">No vegetables found</p>
        <p className="text-sm mt-1">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          // onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
