import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const user = await getOrCreateUser();

		const { productId, quantity } = await request.json();

		if (!productId || !quantity) {
			return NextResponse.json({
				error: "Product ID and quantity are required!",
				status: 400,
			});
		}

		// get or create cart
		const cart = await db.cart.upsert({
			where: { userId: user.id },
			update: {},
			create: { userId: user.id },
		});

		// just create item
		const cartItem = await db.cartItem.create({
			data: {
				cartId: cart.id,
				productId,
				quantity,
			},
		});

		return NextResponse.json(cartItem);
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			error: "Something went wrong!",
			status: 500,
		});
	}
}
