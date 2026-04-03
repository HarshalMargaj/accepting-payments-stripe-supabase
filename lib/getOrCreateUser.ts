import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getOrCreateUser() {
	const clerkUser = await currentUser();

	if (!clerkUser) throw new Error("Unauthorized");

	return db.user.upsert({
		where: { id: clerkUser.id },
		update: {},
		create: {
			id: clerkUser.id,
			email: clerkUser.emailAddresses[0].emailAddress,
			name: clerkUser.fullName,
		},
	});
}
