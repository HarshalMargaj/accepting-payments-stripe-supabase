import axios from "axios";

export const getCartItems = async () => {
	const cartItems = await axios.get(`/api/cart`);

	return cartItems.data;
};
