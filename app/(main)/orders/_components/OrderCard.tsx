import type { Prisma } from "@/app/generated/prisma/client";
import Image from "next/image";

import { Clock, CalendarDays } from "lucide-react";

type OrderItem = Prisma.OrderItemGetPayload<{
	include: {
		product: true;
	};
}>;

const DUMMY_ARRIVAL_MINUTES = 45;

function getArrivalTime(createdAt: Date): string {
	const arrival = new Date(
		new Date(createdAt).getTime() + DUMMY_ARRIVAL_MINUTES * 60 * 1000,
	);
	return arrival.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
}

function formatDate(date: Date): string {
	return new Date(date).toLocaleDateString([], {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

const OrderCard = ({ item }: { item: OrderItem }) => {
	return (
		<div
			key={item.id}
			className="flex items-center justify-between gap-4 py-4 border-b border-neutral-100 last:border-0 group"
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

				{/* Info */}
				<div>
					<p className="font-bold text-zinc-900 text-sm truncate">
						{item.product.name}
					</p>
					<p className="text-zinc-500 text-sm">
						${item.product.price.toFixed(2)} × {item.quantity}
					</p>

					{/* Timestamps */}
					<div className="mt-1.5 flex flex-col gap-0.5">
						<div className="flex items-center gap-1.5 text-xs text-zinc-400">
							<CalendarDays size={11} />
							<span>Ordered: {formatDate(item.createdAt)}</span>
						</div>
						<div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
							<Clock size={11} />
							<span>
								Arriving by: {getArrivalTime(item.createdAt)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderCard;
