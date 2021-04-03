import React from "react";
import { checkItem } from "../utils/checkItem";
export const ProductCard = ({ product, products }) => {
	const {
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
	} = product;

	return (
		<>
			<div className="product-card" key={id}>
				<img src={image} alt={name} className="image-product-card" />
				<h4>{name}</h4>
				<p>{price}</p>
				<p>
					{material} - {brand}
				</p>
				<p className={inStock && "data-hidden"}>Instock</p>
				<p>{rating}</p>
				<button className="btn btn-solid-primary">
					{checkItem(products, id) ? "Add To Cart" : "Go To Cart"}
				</button>
			</div>
		</>
	);
};
