import React from "react";
import { AddToCartButton, CloseButton } from "../components/Button/Button";
import { Card, CardBody, CardFooter } from "../components/Card/Card";
import { useData } from "../context/dataContext";
import { REMOVE_WISHLIST_ITEM } from "../reducers/dataReducer";

export const WishList = ({ setRoute }) => {
	const { wishList, dataDispatch } = useData();

	return (
		<React.Fragment>
			<h2>WishList</h2>
			<div className="product-container">
				{wishList.map(({ id, ...rest }) => (
					<Card key={id}>
						<CloseButton
							onClick={() => dataDispatch({ type: REMOVE_WISHLIST_ITEM, id })}
						/>
						<CardBody {...rest} />
						<CardFooter>
							<AddToCartButton
								setRoute={setRoute}
								renderPage={"WishList"}
								id={id}
								{...rest}
							/>
						</CardFooter>
					</Card>
				))}
			</div>
		</React.Fragment>
	);
};
