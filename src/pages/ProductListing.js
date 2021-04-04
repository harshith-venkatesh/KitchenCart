import React, { useState } from "react";
import { useProducts } from "../context/productContext";
import {
	INCLUDE_OUT_OF_STOCK,
	ONLY_FAST_DELIVERY,
	PRICE_HIGH_TO_LOW,
	PRICE_LOW_TO_HIGH,
	SORT_BY_PRICE
} from "../reducers/productReducer";

import { Card, CardBody, CardFooter } from "../components/Card/Card";
import { AddToCartButton, WishListButton } from "../components/Button/Button";
import Slider from "react-rangeslider";

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
	const { productsState, productsDispatch } = useProducts();

	return (
		<>
			<h1>Product Listing</h1>
			<div className="mt-1">
				<fieldset className="p-1">
					<legend>Price :</legend>
					<label htmlFor={PRICE_HIGH_TO_LOW} className="pr-2">
						<input
							checked={productsState[SORT_BY_PRICE] === PRICE_HIGH_TO_LOW}
							type="radio"
							name={SORT_BY_PRICE}
							id={PRICE_HIGH_TO_LOW}
							onChange={() => {
								productsDispatch({
									type: SORT_BY_PRICE,
									value: PRICE_HIGH_TO_LOW
								});
							}}
						/>
						High To Low
					</label>
					<input
						checked={productsState[SORT_BY_PRICE] === PRICE_LOW_TO_HIGH}
						type="radio"
						name={SORT_BY_PRICE}
						id={PRICE_LOW_TO_HIGH}
						onChange={() => {
							productsDispatch({
								type: SORT_BY_PRICE,
								value: PRICE_LOW_TO_HIGH
							});
						}}
					/>
					<label htmlFor={PRICE_LOW_TO_HIGH}>Low To High</label>
				</fieldset>
			</div>
			<div className="mb-1">
				<fieldset className="p-1">
					<legend>Filters</legend>
					<label htmlFor={INCLUDE_OUT_OF_STOCK} className="pr-1">
						<input
							type="checkbox"
							checked={productsState[INCLUDE_OUT_OF_STOCK]}
							id={INCLUDE_OUT_OF_STOCK}
							onChange={() => productsDispatch({ type: INCLUDE_OUT_OF_STOCK })}
						/>
						Include Out of Stock
					</label>
					<input
						type="checkbox"
						checked={productsState[ONLY_FAST_DELIVERY]}
						id={ONLY_FAST_DELIVERY}
						onChange={() => productsDispatch({ type: ONLY_FAST_DELIVERY })}
					/>
					<label htmlFor={ONLY_FAST_DELIVERY}>Include Fast Delivery</label>
				</fieldset>
			</div>
			<div className="product-container">
				{tranformProducts(productsState).map(({ id, ...rest }) => (
					<Card key={id}>
						<WishListButton id={id} {...rest} />
						<CardBody {...rest} />
						<CardFooter>
							<AddToCartButton
								setRoute={setRoute}
								renderPage={"ProductListing"}
								id={id}
								{...rest}
							/>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
};
