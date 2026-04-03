export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	rating: number;
	reviewCount: number;
	image: string;
}

export type CartMetadataItem = {
	productId: string;
	quantity: number;
	price: number;
};
