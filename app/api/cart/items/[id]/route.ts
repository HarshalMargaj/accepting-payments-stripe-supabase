import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const resolvedParams = await params;
		const { id } = resolvedParams;
		if (!id) {
			return NextResponse.json({
				error: "Cart item ID is required!",
				status: 400,
			});
		}
		await db.cartItem.delete({
			where: { id },
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			error: "Something went wrong!",
			status: 500,
		});
	}
}

export async function PATCH(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const resolvedParams = await params;
		const { id } = resolvedParams;
		const { quantity } = await request.json();
		if (!id) {
			return NextResponse.json({
				error: "Cart item ID is required!",
				status: 400,
			});
		}
		const cartItem = await db.cartItem.update({
			where: { id },
			data: { quantity },
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
