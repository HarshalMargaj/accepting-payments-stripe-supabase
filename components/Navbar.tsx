"use client";

import { Search, ShoppingCart, Leaf } from "lucide-react";

import { useRouter } from "next/navigation";
import { useCartItemsQuery } from "@/hooks/useCartItemsQuery";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

interface NavbarProps {
	searchQuery?: string;
	onSearchChange?: (query: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
	const router = useRouter();
	const { user, isSignedIn } = useUser();
	const { data: cartItems } = useCartItemsQuery();

	return (
		<header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-zinc-100 shadow-sm">
			<div className="px-5">
				<div className="flex items-center justify-between h-16 gap-4">
					<div className="flex items-center gap-2 shrink-0">
						<div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
							<Leaf size={18} className="text-white" />
						</div>
						<span className="text-xl font-black text-zinc-900 tracking-tight">
							Verde
							<span className="text-emerald-600">Market</span>
						</span>
					</div>

					<div className="flex-1 max-w-xl">
						<div className="relative">
							<Search
								size={16}
								className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
							/>
							<input
								type="text"
								placeholder="Search fresh vegetables..."
								value={searchQuery}
								onChange={e => onSearchChange(e.target.value)}
								className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
							/>
						</div>
					</div>

					{/* Right Section: User + Cart */}

					{isSignedIn ? (
						<div className="flex items-center gap-3">
							<button className="relative p-2 rounded-xl hover:bg-zinc-100 transition-colors">
								<ShoppingCart
									size={20}
									className="text-zinc-700"
									onClick={() => router.push("/cart")}
								/>
								{/* {cartCount > 0 && ( */}
								<span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
									{cartItems?.cartItems?.length || 0}
								</span>
								{/* )} */}
							</button>

							<button className="flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-xl hover:bg-zinc-100 transition-colors border border-zinc-200">
								<UserButton />
								<div className="hidden sm:block text-left">
									<p className="text-xs font-semibold text-zinc-800 leading-none">
										{user.fullName}
									</p>
								</div>
							</button>
						</div>
					) : (
						<Button
							className="bg-emerald-500 text-white"
							variant={"default"}
							onClick={() => router.push("/sign-in")}
						>
							Sign In
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
