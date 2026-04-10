// import React, { useState } from "react";

// import { Input } from "./ui/input";
// import { useProductSearch } from "@/hooks/useProductSearch";

// const SearchInput = () => {
// 	const [searchQuery, setSearchQuery] = useState<string>();
// 	const { data: products } = useProductSearch(searchQuery as string);

// 	console.log("searched products: ", products);

// 	return (
// 		<div>
// 			<Input
// 				type="text"
// 				placeholder="Search products..."
// 				className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
// 				value={searchQuery}
// 				onChange={e => setSearchQuery(e.target.value)}
// 			/>
// 		</div>
// 	);
// };

// export default SearchInput;
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// get query from URL
	const initialQuery = searchParams.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(initialQuery);

	// keep input in sync if URL changes
	useEffect(() => {
		setSearchQuery(initialQuery);
	}, [initialQuery]);

	const handleChange = (value: string) => {
		setSearchQuery(value);

		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set("q", value);
		} else {
			params.delete("q");
		}

		router.push(`/products?${params.toString()}`);
	};

	return (
		<Input
			type="text"
			placeholder="Search products..."
			className="w-full pl-10 pr-4 py-2.5 h-10 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-xl"
			value={searchQuery}
			onChange={e => handleChange(e.target.value)}
		/>
	);
};

export default SearchInput;
