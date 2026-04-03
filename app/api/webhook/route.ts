import { db } from "@/lib/db";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
	const body = await req.text();
	const headersList = await headers();
	const signature = headersList.get("stripe-signature");

	if (!signature) {
		return new Response("Missing signature", { status: 400 });
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		console.log("Webhook Error:", err);
		return new Response("Webhook Error", { status: 400 });
	}

	// 🎯 EVENT HANDLE
	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		const userId = session.metadata?.userId;

		if (!userId) {
			return new Response("Missing user ID", { status: 400 });
		}

		const existingOrder = await db.order.findUnique({
			where: { stripeId: session.id },
		});

		if (existingOrder) {
			console.log("⚠️ Order already exists");
			return new Response("OK", { status: 200 });
		}

		const lineItems = await stripe.checkout.sessions.listLineItems(
			session.id,
			{
				expand: ["data.price.product"],
			},
		);

		const orderItemsData = [];

		for (const item of lineItems.data) {
			const product = item.price?.product as Stripe.Product;

			// ❌ skip GST / Delivery
			if (!product?.metadata?.productId) continue;

			orderItemsData.push({
				productId: product.metadata.productId,
				quantity: item.quantity!,
				price: item.amount_total! / 100,
			});
		}

		await db.order.create({
			data: {
				userId,
				amount: session.amount_total! / 100,
				stripeId: session.id,
				status: "paid",
				orderItems: {
					create: orderItemsData,
				},
			},
		});

		console.log("✅ Order created");
	}

	return new Response("OK", { status: 200 });
}
