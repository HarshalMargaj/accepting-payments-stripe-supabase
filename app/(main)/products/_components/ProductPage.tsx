import type { Product } from "@/app/generated/prisma/client";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductPageProps {
	product: Product;
}

const ProductPage = ({ product }: ProductPageProps) => {
	return (
		<div className="flex gap-10">
			{/* LEFT - IMAGE */}
			<div>
				<Image
					src={product.image}
					alt={product.slug}
					width={420}
					height={420}
					className="rounded-xl border"
				/>
			</div>

			{/* RIGHT - DETAILS */}
			<div className="flex-1 space-y-4">
				{/* CATEGORY */}
				<div className="text-sm text-emerald-600 font-medium">
					Vegetables
				</div>

				{/* NAME */}
				<div className="text-3xl font-bold">{product.name}</div>

				{/* RATING */}
				<div>
					<StarRating
						rating={product.rating}
						reviewCount={product.review_count}
					/>
				</div>

				{/* PRICE */}
				<div className="flex items-center gap-3">
					<div className="text-3xl font-bold text-gray-900">
						₹{product.price}
					</div>
					<div className="text-sm line-through text-gray-400">
						₹{product.price + 50}
					</div>
					<div className="text-sm text-green-600 font-medium">
						Save ₹50
					</div>
				</div>

				{/* STOCK STATUS */}
				<div className="text-sm text-green-600 font-medium">
					In Stock ✅
				</div>

				{/* DESCRIPTION */}
				<div className="text-neutral-600 leading-relaxed">
					{product.description}
				</div>

				{/* HIGHLIGHTS */}
				<div className="space-y-1">
					<div className="font-semibold">Highlights:</div>
					<ul className="list-disc list-inside text-sm text-gray-600">
						<li>Fresh and organic</li>
						<li>Direct from farm</li>
						<li>No chemicals added</li>
						<li>Premium quality</li>
					</ul>
				</div>

				{/* DELIVERY INFO */}
				<div className="bg-gray-50 p-3 rounded-md text-sm space-y-1">
					<div>🚚 Free delivery by tomorrow</div>
					<div>🔁 7-day return policy</div>
					<div>💳 Cash on delivery available</div>
				</div>

				{/* QUANTITY + CTA */}
				<div className="flex items-center gap-4 pt-2">
					<Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
						Add to cart
					</Button>
				</div>

				{/* EXTRA INFO */}
				<div className="text-xs text-gray-500 pt-4 border-t border-neutral-500">
					Secure checkout powered by trusted payment gateways.
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
