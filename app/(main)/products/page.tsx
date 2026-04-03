"use client";

import { useQuery } from "@tanstack/react-query";
import ProductGrid from "./_components/ProductGrid";
import axios from "axios";

const ProductsPage = () => {
	const fetchProducts = async () => {
		const products = await axios.get("/api/products");
		return products.data;
	};

	const { data: products = [] } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	return (
		<div>
			<ProductGrid products={products} />
		</div>
	);
};

export default ProductsPage;
