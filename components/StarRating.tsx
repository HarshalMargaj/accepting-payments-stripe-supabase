import { Star } from "lucide-react";

interface StarRatingProps {
	rating: number;
	reviewCount?: number;
	size?: "sm" | "md";
}

export default function StarRating({
	rating,
	reviewCount,
	size = "sm",
}: StarRatingProps) {
	const starSize = size === "sm" ? 14 : 16;
	const fullStars = Math.floor(rating);
	const hasHalf = rating % 1 >= 0.5;

	return (
		<div className="flex items-center gap-1.5">
			<div className="flex items-center gap-0.5">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						size={starSize}
						className={
							i < fullStars
								? "fill-amber-400 text-amber-400"
								: i === fullStars && hasHalf
									? "fill-amber-200 text-amber-400"
									: "fill-zinc-200 text-zinc-200"
						}
					/>
				))}
			</div>
			<span className="text-xs font-semibold text-zinc-700">
				{rating}
			</span>
			{reviewCount !== undefined && (
				<span className="text-xs text-zinc-400">({reviewCount})</span>
			)}
		</div>
	);
}
