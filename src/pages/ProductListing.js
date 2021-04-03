import { productData } from "../constants/productData";
import React from "react";
import { ProductCard } from "../components/ProductCard";
export const ProductListing = () => {
	return (
		<>
			<h1>Product Listing</h1>
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
