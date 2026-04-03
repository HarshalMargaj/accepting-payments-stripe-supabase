import { Prisma } from "@/app/generated/prisma/client";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { NextResponse } from "next/server";
import Stripe from "stripe";

type itemType = Prisma.CartItemGetPayload<{
	include: {
		product: true;
	};
}>;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
	try {
		const { items, gst, delivery } = await req.json();
		const user = await getOrCreateUser();

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			billing_address_collection: "required",
			metadata: {
				userId: user.id,
			},

			line_items: [
				...items.map((item: itemType) => ({
					price_data: {
						currency: "inr",
						product_data: {
							name: item.product.name,
							metadata: {
								productId: item.product.id,
							},
						},
						unit_amount: item.product.price * 100, // ₹ to paise
					},
					quantity: item.quantity,
				})),
				{
					price_data: {
						currency: "inr",
						product_data: {
							name: "GST (18%)",
						},
						unit_amount: Math.round(gst * 100),
					},
					quantity: 1,
				},
				{
					price_data: {
						currency: "inr",
						product_data: {
							name: "Delivery Charges",
						},
						unit_amount: delivery * 100,
					},
					quantity: 1,
				},
			],

			mode: "payment",

			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "Something went wrong" });
	}
}
