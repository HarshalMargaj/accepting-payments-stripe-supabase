import { PrismaClient } from "@/app/generated/prisma/client";
import { products } from "@/data/products";
import { PrismaPg } from "@prisma/adapter-pg";

import "dotenv/config";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });

console.log(process.env.DATABASE_URL);

async function main() {
	// 🔥 Bulk insert
	await prisma.product.createMany({
		data: products,
		skipDuplicates: true, // optional
	});

	console.log("✅ Data inserted successfully");
}

main()
	.catch(e => {
		console.error("❌ Error inserting data:", e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
