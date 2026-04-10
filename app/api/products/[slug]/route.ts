import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ slug: string }>;
	},
) {
	try {
		const resolvedParams = await params;
		const { slug } = resolvedParams;

		console.log(slug);

		if (!slug) {
			return NextResponse.json({
				error: "Product slug is required!",
				status: 400,
			});
		}
		const product = await db.product.findUnique({
			where: {
				slug,
			},
		});
		return NextResponse.json(product);
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			error: "Something went wrong!",
			status: 500,
		});
	}
}
