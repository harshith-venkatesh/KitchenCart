import React from "react";
import { useData } from "../context/dataContext";
import {
	DEC_QTY,
	INC_QTY,
	REMOVE_CARTLIST_ITEM
} from "../reducers/dataReducer";

const getTotalPrice = (items) => {
	return items.reduce((amount, { price, qty }) => amount + price * qty, 0);
};
export const Cart = () => {
	const { cartList, dataDispatch } = useData();
	return (
		<React.Fragment>
			<h2>Cart</h2>
			<h5>Total: {getTotalPrice(cartList)}</h5>
			<div className="product-container">
				{cartList.map(
					({ id, name, price, inStock, level, fastDelivery, image, qty }) => (
						<div key={id} className="product-card">
							<img className="image-product-card" src={image} alt={name} />
							<button
								className="btn btn-icon icon-transparent"
								onClick={() => {
									dataDispatch({ type: REMOVE_CARTLIST_ITEM, id });
								}}
							>
								<i className="fa fa-times"></i>
							</button>
							<h4>{name}</h4>
							<div>Rs. {price}</div>

							<div>{level}</div>
							{inStock ? <div>In Stock</div> : <div> Out of Stock</div>}
							{fastDelivery ? (
								<div>Fast Delivery</div>
							) : (
								<div>Delivery in 2 days</div>
							)}
							<div>
								<button
									className="btn btn-icon icon-transparent mb-1 mt-1"
									onClick={() => {
										dataDispatch({ type: INC_QTY, id });
									}}
								>
									<i className="fa fa-plus"></i>
								</button>
								<span className="ml-sm mr-sm">{qty}</span>
								<button
									className="btn btn-icon icon-transparent mb-1 mt-1"
									onClick={() => {
										dataDispatch({ type: DEC_QTY, id });
									}}
								>
									<i className="fa fa-minus"></i>
								</button>
							</div>
						</div>
					)
				)}
			</div>
		</React.Fragment>
	);
};
