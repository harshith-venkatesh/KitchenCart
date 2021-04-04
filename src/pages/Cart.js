import React from "react";
import { CloseButton } from "../components/Button/Button";
import { Card, CardBody } from "../components/Card/Card";
import { useData } from "../context/dataContext";
import {
	DEC_QTY,
	INC_QTY,
	REMOVE_CARTLIST_ITEM
} from "../reducers/dataReducer";

const getTotalPrice = (items) => {
	return items.reduce((amount, { price, qty }) => amount + price * qty, 0);
};
export const Cart = ({ setRoute }) => {
	const { cartList, dataDispatch } = useData();
	return (
		<React.Fragment>
			<h2>My Cart</h2>
			<h4>Total: Rs. {getTotalPrice(cartList)}</h4>
			<div className="product-container">
				{cartList.length === 0 && (
					<div>
						Cart is Empty
						<button
							className="btn btn-solid-primary"
							onClick={() => setRoute("ProductListing")}
						>
							Continue Shopping
						</button>
					</div>
				)}
				{cartList.map(({ id, qty, ...rest }) => (
					<Card key={id}>
						<CloseButton
							onClick={() => {
								dataDispatch({ type: REMOVE_CARTLIST_ITEM, id });
							}}
						/>
						<CardBody {...rest} />
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
					</Card>
				))}
			</div>
		</React.Fragment>
	);
};
