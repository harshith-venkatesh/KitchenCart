import { productData } from "../constants/productData";
import React from "react";
import { ProductCard } from "../components/ProductCard";
import { useData } from "../context/dataContext";
import { useProducts } from "../context/productContext";
import {
	INCLUDE_OUT_OF_STOCK,
	ONLY_FAST_DELIVERY,
	PRICE_HIGH_TO_LOW,
	PRICE_LOW_TO_HIGH,
	SORT_BY_PRICE
} from "../reducers/productReducer";
import { checkItem } from "../utils/checkItem";
import {
	ADD_CARTLIST_ITEM,
	ADD_WISHLIST_ITEM,
	REMOVE_WISHLIST_ITEM
} from "../reducers/dataReducer";

const tranformProducts = (state) => {
	const sortCheck = state[SORT_BY_PRICE];
	let sortedProducts = state.products;
	if (sortCheck) {
		sortedProducts = sortedProducts.sort((a, b) =>
			sortCheck === PRICE_HIGH_TO_LOW ? b.price - a.price : a.price - b.price
		);
	}
	//check whether this is working or not

	//filter the products based on stock
	let filteredProducts = sortedProducts;
	if (!state[INCLUDE_OUT_OF_STOCK]) {
		filteredProducts = sortedProducts.filter((product) => product.inStock);
	}
	let finalProducts = filteredProducts;
	if (state[ONLY_FAST_DELIVERY]) {
		finalProducts = filteredProducts.filter((product) => product.fastDelivery);
	}

	return finalProducts;
};

export const ProductListing = ({ setRoute }) => {
	const { cartList, wishList, dataDispatch } = useData();
	const { productsState, productsDispatch } = useProducts();
	console.log({ wishList });
	return (
		<>
			<h1>Product Listing</h1>
			<div className="mt-1">
				Price:{" "}
				<input
					checked={productsState[SORT_BY_PRICE] === PRICE_HIGH_TO_LOW}
					type="radio"
					name={SORT_BY_PRICE}
					id={PRICE_HIGH_TO_LOW}
					onChange={() => {
						productsDispatch({ type: SORT_BY_PRICE, value: PRICE_HIGH_TO_LOW });
					}}
				/>
				<label htmlFor={PRICE_HIGH_TO_LOW}>HIGH TO LOW</label>
				<input
					checked={productsState[SORT_BY_PRICE] === PRICE_LOW_TO_HIGH}
					type="radio"
					name={SORT_BY_PRICE}
					id={PRICE_LOW_TO_HIGH}
					onChange={() => {
						productsDispatch({ type: SORT_BY_PRICE, value: PRICE_LOW_TO_HIGH });
					}}
				/>
				<label htmlFor={PRICE_LOW_TO_HIGH}>LOW TO HIGH</label>
			</div>
			<div className="mb-1">
				<input
					type="checkbox"
					checked={productsState[INCLUDE_OUT_OF_STOCK]}
					id={INCLUDE_OUT_OF_STOCK}
					onChange={() => productsDispatch({ type: INCLUDE_OUT_OF_STOCK })}
				/>
				<label htmlFor={INCLUDE_OUT_OF_STOCK}>Include Out of Stock</label>
				<input
					type="checkbox"
					checked={productsState[ONLY_FAST_DELIVERY]}
					id={ONLY_FAST_DELIVERY}
					onChange={() => productsDispatch({ type: ONLY_FAST_DELIVERY })}
				/>
				<label htmlFor={ONLY_FAST_DELIVERY}>Include Fast Delivery</label>
			</div>
			<div className="product-container">
				{tranformProducts(productsState).map(
					({
						id,
						name,
						image,
						price,
						material,
						brand,
						inStock,
						fastDelivery,
						rating,
						offers,
						idealFor,
						level,
						color
					}) => (
						<div className="product-card" key={id}>
							<img src={image} alt={name} className="image-product-card" />
							<button
								className={
									checkItem(wishList, id)
										? "wishlist red btn-close"
										: "wishlist gray btn-close"
								}
								onClick={() => {
									checkItem(wishList, id)
										? dataDispatch({ type: REMOVE_WISHLIST_ITEM, id })
										: dataDispatch({
												type: ADD_WISHLIST_ITEM,
												item: {
													id,
													name,
													price,
													inStock,
													level,
													fastDelivery,
													image
												}
										  });
								}}
							>
								<i className="fa fa-heart"></i>
							</button>
							<h4>{name}</h4>
							<p>Rs. {price}</p>
							<p>
								{material} - {brand}
							</p>
							<div>{level}</div>
							{inStock ? <div>In Stock</div> : <div> Out of Stock</div>}
							{fastDelivery ? (
								<div>Fast Delivery</div>
							) : (
								<div>Delivery in 2 days</div>
							)}
							<button
								className="btn btn-solid-primary"
								onClick={() => {
									checkItem(cartList, id)
										? setRoute("Cart")
										: dataDispatch({
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
								}}
							>
								{checkItem(cartList, id) ? "Go To Cart" : "Add To Cart"}
							</button>
						</div>
					)
				)}
			</div>
		</>
	);
};
