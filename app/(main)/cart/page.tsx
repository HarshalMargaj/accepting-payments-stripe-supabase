"use client";

import { useCartItemsQuery } from "@/hooks/useCartItemsQuery";

import CartCard from "./_components/CartCard";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Cart = () => {
	const { data: cartItems } = useCartItemsQuery();

	console.log("cart", cartItems?.cartItems);

	const subtotal =
		cartItems?.cartItems.reduce((acc, item) => {
			return acc + item.product.price * item.quantity;
		}, 0) ?? 0;
	const GST = subtotal * (18 / 100);
	const delivery = 40;
	const total = Math.max(0, subtotal + GST + delivery);

	const paymentDetails = [
		{
			id: 1,
			name: "Subtotal",
			value: subtotal,
		},
		{
			id: 2,
			name: "GST (18%)",
			value: GST,
		},
		{ id: 3, name: "Delivery", value: 40 },
		{ id: 5, name: "Total", value: total },
	];

	const handleCheckout = async () => {
		const res = await axios.post("/api/checkout", {
			items: cartItems?.cartItems,
			gst: GST,
			delivery: delivery,
		});

		window.location.href = res.data.url;
	};

	return (
		<div className="flex items-start gap-8 p-5">
			<div className="flex-1">
				{cartItems?.cartItems.map(item => (
					<CartCard key={item.id} item={item} />
				))}
			</div>
			<div className="border-zinc-100 border shadow-2xl rounded-md w-75 p-5 space-y-2">
				{paymentDetails.map(item => (
					<div
						key={item.id}
						className={`flex items-center justify-between ${item.name === "Total" ? "font-bold" : ""}`}
					>
						<div>{item.name}</div>
						<div>₹{item.value.toFixed(2)}</div>
					</div>
				))}
				<div>
					<Button
						onClick={handleCheckout}
						className="w-full bg-emerald-500 text-white"
					>
						Checkout
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
