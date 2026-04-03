import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user = await getOrCreateUser();
		const cart = await db.cart.findUnique({
			where: {
				userId: user.id,
			},
			include: {
				cartItems: {
					include: {
						product: true,
					},
				},
			},
		});

		return NextResponse.json(cart);
	} catch (error) {
		console.log(error);
		NextResponse.json({
			error: "Something went wrong!",
			status: 500,
		});
	}
}
