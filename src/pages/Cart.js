import React from "react";
import { useData } from "../context/dataContext";

const getTotalPrice = (items) => {
	return items.reduce((amount, { price, qty }) => amount + price * qty, 0);
};
export const Cart = () => {
	const { cartList, dataDispatch } = useData();
	return (
		<React.Fragment>
			<h2>Cart</h2>
			<h5>Total: {getTotalPrice(cartList)}</h5>
		</React.Fragment>
	);
};
