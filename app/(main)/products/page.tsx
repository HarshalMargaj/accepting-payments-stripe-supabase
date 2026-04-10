"use client";

import ProductGrid from "./_components/ProductGrid";
import { useSearchParams } from "next/navigation";
import { useProductSearch } from "@/hooks/useProductSearch";

const ProductsPage = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";
	const { data: products = [] } = useProductSearch(query as string);

	return (
		<div>
			<ProductGrid products={products} />
		</div>
	);
};

export default ProductsPage;
