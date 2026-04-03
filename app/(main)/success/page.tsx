import { ArrowRight, CheckCircle2, Leaf } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage = async () => {
	return (
		<div className="flex-1 flex items-center justify-center px-4 py-10">
			<div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-10 max-w-sm w-full text-center">
				{/* Animated checkmark */}
				<div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
					<span className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40" />
					<span className="absolute inset-0 rounded-full bg-emerald-100" />
					<CheckCircle2
						size={44}
						className="relative z-10 text-emerald-600"
						strokeWidth={1.5}
					/>
				</div>

				{/* Heading */}
				<h1 className="text-2xl font-black text-zinc-900 mb-2">
					Payment Successful!
				</h1>
				<p className="text-sm text-zinc-400 leading-relaxed mb-1">
					Order confirmed.
				</p>
				<p className="text-sm text-zinc-400 mb-8">
					Fresh veggies are on their way 🥦
				</p>

				{/* Delivery estimate pill */}
				<div className="bg-emerald-50 border border-emerald-100 rounded-xl py-3 px-4 mb-8">
					<p className="text-xs text-emerald-600 font-semibold">
						Estimated Delivery
					</p>
					<p className="text-sm font-black text-emerald-700 mt-0.5">
						Today, 3:00 – 4:00 PM
					</p>
				</div>

				{/* CTAs */}
				<Link
					href="/"
					className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all text-sm mb-3"
				>
					<Leaf size={15} />
					Continue Shopping
					<ArrowRight size={15} />
				</Link>

				<Link
					href="/orders"
					className="text-sm text-zinc-400 hover:text-zinc-600 font-medium transition-colors"
				>
					View My Orders
				</Link>
			</div>
		</div>
	);
};

export default PaymentSuccessPage;
