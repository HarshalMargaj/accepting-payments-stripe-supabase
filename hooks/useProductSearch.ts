import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "use-debounce";

export const searchProducts = async (query: string) => {
	const res = await axios.get(`/api/products?q=${query}`);

	return res.data;
};

export const useProductSearch = (query: string) => {
	const [debounced] = useDebounce(query, 500);
	return useQuery({
		queryFn: () => searchProducts(debounced),
		queryKey: ["products", debounced],
		staleTime: 1000 * 30,
	});
};
