"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import ProductPage from "../_components/ProductPage";

const Page = () => {
	const { slug } = useParams();

	const fetchProduct = async () => {
		const res = await axios.get(`/api/products/${slug}`);
		return res.data;
	};

	const { data: product, isLoading } = useQuery({
		queryKey: ["product", slug],
		queryFn: fetchProduct,
		enabled: !!slug,
	});

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<div className="p-5">
			<ProductPage product={product} />
		</div>
	);
};

export default Page;
