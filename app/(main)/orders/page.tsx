"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderCard from "./_components/OrderCard";
import { Prisma } from "@/app/generated/prisma/client";

type OrderItem = Prisma.OrderGetPayload<{
	include: {
		orderItems: {
			include: {
				product: true;
			};
		};
	};
}>;

const Page = () => {
	const handleOrderItems = async () => {
		const res = await axios.get("/api/order");

		return res.data;
	};

	const { data: orderItems } = useQuery({
		queryKey: ["orderItems"],
		queryFn: handleOrderItems,
	});

	return (
		<div className="p-5">
			{orderItems?.map((order: OrderItem) =>
				order.orderItems?.map(orderItem => (
					<OrderCard key={orderItem.id} item={orderItem} />
				)),
			)}
		</div>
	);
};

export default Page;
