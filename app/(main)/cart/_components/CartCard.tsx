import type { Prisma } from "@/app/generated/prisma/client";
import Image from "next/image";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import QuantityControl from "@/components/QuantityControl";

type CartItem = Prisma.CartItemGetPayload<{
	include: {
		product: true;
	};
}>;

const CartCard = ({ item }: { item: CartItem }) => {
	const queryClient = useQueryClient();

	const handleRemoveProduct = async (id: string) => {
		await axios.delete(`/api/cart/items/${id}`);
	};

	const { mutate: updateQuantityMutation } = useMutation({
		// normal mutation function to api call
		mutationFn: async (newQuantity: number) => {
			return await axios.patch(`/api/cart/items/${item.id}`, {
				quantity: newQuantity,
			});
		},
		// optimistic logic
		onMutate: async newQuantity => {
			// cancelling all ongoing queries
			await queryClient.cancelQueries({ queryKey: ["cartItems"] });
			// storing previous data
			const previousCart = queryClient.getQueryData(["cartItems"]);

			// setting new data manually
			queryClient.setQueryData(["cartItems"], (old: any) => {
				if (!old) return old;
				return {
					...old,
					cartItems: old.cartItems.map((cartItem: CartItem) =>
						cartItem.id === item.id
							? { ...cartItem, quantity: newQuantity }
							: cartItem,
					),
				};
			});

			// returnning context
			return { previousCart };
		},

		// onError setting previous data - rollback -
		onError: (err, _variables, context) => {
			queryClient.setQueryData(["cartItems"], context?.previousCart);
		},

		// re-syncing with server (source of truth)
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
	});

	const { mutateAsync: removeProductMutation } = useMutation({
		mutationFn: handleRemoveProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
		onError: err => {
			console.log(err);
		},
	});

	return (
		<div
			key={item.id}
			className="flex items-center justify-between gap-4 py-4 border-b border-neutral-100 last:border-0 group "
		>
			<div className="flex items-center gap-4">
				<div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-emerald-50">
					<Image
						src={item.product.image}
						alt={item.product.name}
						fill
						sizes="80px"
						className="object-cover"
					/>
				</div>

				<div className="">
					<p className="font-bold text-zinc-900 text-sm truncate">
						{item.product.name}
					</p>
					<p className="">${item.product.price.toFixed(2)}</p>
					<QuantityControl
						quantity={item.quantity}
						onIncrease={() =>
							updateQuantityMutation(item.quantity + 1)
						}
						onDecrease={() => {
							if (item.quantity > 1) {
								updateQuantityMutation(item.quantity - 1);
							}
						}}
					/>
				</div>
			</div>
			<Button
				className="bg-emerald-500 text-white"
				onClick={() => removeProductMutation(item.id)}
			>
				<Trash />
				Remove
			</Button>
		</div>
	);
};

export default CartCard;
