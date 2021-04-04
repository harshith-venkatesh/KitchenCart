import { useData } from "../../context/dataContext";
import {
	ADD_CARTLIST_ITEM,
	ADD_WISHLIST_ITEM,
	REMOVE_WISHLIST_ITEM
} from "../../reducers/dataReducer";
import { checkItem } from "../../utils/checkItem";

export const CloseButton = ({ onClick }) => (
	<button className="btn btn-solid-primary" onClick={onClick}>
		<i className="fa fa-times"></i>
	</button>
);

export const AddToCartButton = ({ setRoute, renderPage, id, ...rest }) => {
	const { cartList, dataDispatch } = useData();
	const handleClick = () => {
		if (checkItem(cartList, id)) {
			setRoute("Cart");
		} else {
			dataDispatch({
				type: ADD_CARTLIST_ITEM,
				item: { id, qty: 1, ...rest }
			});
		}
	};
	return (
		<button className="btn btn-solid-primary" onClick={handleClick}>
			{checkItem(cartList, id) ? "Go To Cart" : "Add To Cart"}
		</button>
	);
};

const setWishListButtonClass = (wishList, id) => {
	return checkItem(wishList, id)
		? "wishlist red btn-close"
		: "wishlist gray btn-close";
};
export const WishListButton = ({ id, ...rest }) => {
	const { wishList, dataDispatch } = useData();
	const handleClick = () => {
		checkItem(wishList, id)
			? dataDispatch({
					type: REMOVE_WISHLIST_ITEM,
					id
			  })
			: dataDispatch({
					type: ADD_WISHLIST_ITEM,
					item: { id, ...rest }
			  });
	};

	return (
		<button
			className={setWishListButtonClass(wishList, id)}
			onClick={handleClick}
		>
			<i className="fa fa-heart"></i>
		</button>
	);
};
//operatin button
