import React from "react";
import { useData } from "../context/dataContext";
import {
	ADD_CARTLIST_ITEM,
	REMOVE_WISHLIST_ITEM
} from "../reducers/dataReducer";
import { checkItem } from "../utils/checkItem";

export const WishList = ({ setRoute }) => {
	const { cartList, wishList, dataDispatch } = useData();

	return (
		<React.Fragment>
			<h2>WishList</h2>
			<div className="product-container">
				{wishList.map(
					({ id, name, image, price, inStock, level, fastDelivery }) => (
						<div key={id} className="product-card">
							<img className="image-product-card" src={image} alt={name} />
							<button
								className="btn-close bg-white"
								onClick={() => {
									dataDispatch({ type: REMOVE_WISHLIST_ITEM, id });
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
							<button
								className="btn btn-solid-primary m-1"
								onClick={() => {
									if (checkItem(cartList, id)) {
										setRoute("Cart");
									} else {
										dataDispatch({
											type: ADD_CARTLIST_ITEM,
											item: {
												id,
												name,
												price,
												inStock,
												level,
												fastDelivery,
												image,
												qty: 1
											}
										});
										dataDispatch({ type: REMOVE_WISHLIST_ITEM, id });
									}
								}}
							>
								{checkItem(cartList, id) ? "Go To Cart" : "Add To Cart"}
							</button>
						</div>
					)
				)}
			</div>
		</React.Fragment>
	);
};
