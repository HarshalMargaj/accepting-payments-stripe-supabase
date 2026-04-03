import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
	quantity: number;
	onIncrease: () => void;
	onDecrease: () => void;
}

const QuantityControl = ({
	quantity,
	onIncrease,
	onDecrease,
}: QuantityControlProps) => {
	return (
		<div className="flex items-center gap-2">
			<Button
				className="bg-emerald-500 h-6 w-6 rounded-sm text-white"
				onClick={onDecrease}
			>
				<Minus />
			</Button>
			{quantity || 0}
			<Button
				className="bg-emerald-500 h-6 w-6 rounded-sm text-white"
				onClick={onIncrease}
			>
				<Plus />
			</Button>
		</div>
	);
};

export default QuantityControl;
