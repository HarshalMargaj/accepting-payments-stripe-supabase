"use client";

import Image from "next/image";
import { ShoppingCart, Check } from "lucide-react";
import StarRating from "@/components/StarRating";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartItemsQuery } from "@/hooks/useCartItemsQuery";
import Link from "next/link";
import type { Product } from "@/app/generated/prisma/client";

type ExtendedProduct = Product & {
	highlighted_name: string;
	highlighted_description: string;
};

interface ProductCardProps {
	product: ExtendedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	const queryClient = useQueryClient();
	const { data: cartItems } = useCartItemsQuery();

	const handleAddToCart = async () => {
		const result = await axios.post(`/api/cart/items`, {
			productId: product.id,
			quantity: 1,
		});

		return result.data;
	};

	const { mutateAsync: addToCartMutation, isPending } = useMutation({
		mutationFn: handleAddToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
		onError: err => {
			console.log(err);
		},
	});

	const addToCart = async () => {
		await addToCartMutation();
	};

	const hasAddedToCart = cartItems?.cartItems.some(
		item => item.productId === product.id,
	);

	return (
		<Link href={`/products/${product.slug}`}>
			<div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-zinc-100 hover:border-emerald-200 transition-all duration-300 flex flex-col h-120">
				<div className="relative overflow-hidden bg-linear-to-br from-emerald-50 to-green-100">
					<Image
						src={product.image}
						alt={product.name}
						width={300}
						height={300}
						priority
						className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
					/>

					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
				</div>

				<div className="p-4 flex flex-col flex-1">
					<h3 className="font-bold text-zinc-900 text-[15px] leading-snug mb-1">
						<div
							className="font-semibold"
							dangerouslySetInnerHTML={{
								__html:
									product.highlighted_name || product.name,
							}}
						/>
					</h3>

					<div className="mb-2">
						<StarRating
							rating={product.rating}
							reviewCount={product.review_count}
						/>
					</div>

					{/* Description */}
					<p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
						<div
							className="font-semibold"
							dangerouslySetInnerHTML={{
								__html:
									product.highlighted_description ||
									product.description,
							}}
						/>
					</p>

					<div className="flex items-center justify-between mt-auto">
						<div>
							<span className="text-2xl font-black text-zinc-900 tracking-tight">
								₹{product.price.toFixed(2)}
							</span>
						</div>

						<button
							disabled={hasAddedToCart}
							onClick={addToCart}
							className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
								hasAddedToCart
									? "bg-emerald-500 text-white"
									: "bg-emerald-600 hover:bg-emerald-700 text-white"
							}`}
						>
							{isPending ? (
								<div>loading</div>
							) : hasAddedToCart ? (
								<>
									<Check size={15} />
									Added
								</>
							) : (
								<>
									<ShoppingCart size={15} />
									Add to cart
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
}
