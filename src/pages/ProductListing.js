import { productData } from "../constants/productData";
import React from "react";
import { ProductCard } from "../components/ProductCard";
import { useData } from "../context/dataContext";
import { useProducts } from "../context/productContext";
import { SORT_BY_PRICE } from "../reducers/productReducer";

export const HIGH_TO_LOW = "HIGH_TO_LOW";
export const LOW_TO_HIGH = "LOW_TO_HIGH";
export const ProductListing = ({ setRoute }) => {
	const { cartList, wishList, dataDispatch } = useData();
	const { productsState, productsDispatch } = useProducts();

	return (
		<>
			<h1>Product Listing</h1>
			<div className="mt-1">
				Price: <input checked={productsState[SORT_BY_PRICE] === HIGH_TO_LOW} />
			</div>
			<div className="product-container">
				{productData.map((product) => (
					<ProductCard
						product={product}
						key={product.id}
						products={productData}
					/>
				))}
			</div>
		</>
	);
};
