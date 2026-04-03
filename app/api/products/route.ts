import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const products = await db.product.findMany();

		return NextResponse.json(products);
	} catch (error) {
		console.log(error);

		return NextResponse.json({
			error: "Something went wrong!",
			status: 500,
		});
	}
}
