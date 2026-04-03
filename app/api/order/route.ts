import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user = await getOrCreateUser();
		const orders = await db.order.findMany({
			where: {
				userId: user.id,
			},
			include: {
				orderItems: {
					include: {
						product: true,
					},
				},
			},
		});

		return NextResponse.json(orders);
	} catch (error) {
		console.log(error);
		NextResponse.json({ message: "Something went wrong", status: 500 });
	}
}
