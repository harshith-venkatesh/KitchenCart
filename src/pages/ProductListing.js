import React from "react";
import { useProducts } from "../context/productContext";
import {
	INCLUDE_OUT_OF_STOCK,
	ONLY_FAST_DELIVERY,
	PRICE_HIGH_TO_LOW,
	SORT_BY_PRICE
} from "../reducers/productReducer";

import { Card, CardBody, CardFooter } from "../components/Card/Card";
import { AddToCartButton, WishListButton } from "../components/Button/Button";
import { Filter } from "../components";

const tranformProducts = (state) => {
	const sortCheck = state[SORT_BY_PRICE];

	let sortedProducts = state.products;
	if (sortCheck) {
		sortedProducts = sortedProducts.sort((a, b) =>
			sortCheck === PRICE_HIGH_TO_LOW ? b.price - a.price : a.price - b.price
		);
	}

	let filteredProducts = sortedProducts;
	if (!state[INCLUDE_OUT_OF_STOCK]) {
		filteredProducts = sortedProducts.filter((product) => product.inStock);
	}
	let priceRangeProducts = filteredProducts;
	if (state[ONLY_FAST_DELIVERY]) {
		priceRangeProducts = filteredProducts.filter(
			(product) => product.fastDelivery
		);
	}
	let finalProducts = priceRangeProducts;
	console.log(state);

	console.log(state.priceRange);
	console.log(finalProducts);
	finalProducts = priceRangeProducts.filter((product) => {
		return product.price < state.priceRange;
	});
	console.log(finalProducts);
	return finalProducts;
};

export const ProductListing = ({ setRoute }) => {
	const { productsState } = useProducts();

	return (
		<>
			<h2>Product Listing</h2>
			<div className="container">
				<div className="sidenav-container">
					<Filter />
				</div>
				.<div className="mt-1"></div>
				<div className="component-container">
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
				</div>
			</div>
		</>
	);
};
