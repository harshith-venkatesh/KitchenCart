import React from "react";
export const ProductCard = ({ product }) => {
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
				{inStock && <p>Instock</p>}
				<p>{rating}</p>
			</div>
		</>
	);
};
