import { Prisma } from "@/app/generated/prisma/client";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const query = searchParams.get("q") || "";

		console.log("query", query);

		if (!query) {
			const products = await db.product.findMany();
			return NextResponse.json(products);
		}

		const products = await db.$queryRaw(Prisma.sql`
			SELECT 
				id, 
				name, 
				description, 
				price, 
				rating, 
				"reviewCount", 
				image, 
				ts_rank(
					search_vector,
					websearch_to_tsquery('english', ${query})
				) as rank
				FROM public."Product"
				WHERE search_vector IS NOT NULL
				AND search_vector @@ websearch_to_tsquery('english', ${query})
				ORDER BY rank DESC
		`);

		return NextResponse.json(products);
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: "Something went wrong",
			status: 500,
		});
	}
}
