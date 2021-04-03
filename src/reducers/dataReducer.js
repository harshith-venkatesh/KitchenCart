export const initialData = {
	cartList: [],
	wishList: []
};

export const ADD_CARTLIST_ITEM = "addCartItem";
export const INC_QTY = "incQty";
export const DEC_QTY = "decQty";

export const REMOVE_CARTLIST_ITEM = "removeCartlistItem";
export const ADD_WISHLIST_ITEM = "addWishlistItem";
export const REMOVE_WISHLIST_ITEM = "removeWishlistItem";

export const dataReducer = (state, { type, id, item }) => {
	const { cartList, wishList } = state;
	switch (type) {
		case ADD_CARTLIST_ITEM:
			return {
				...state,
				cartList: cartList.concat(item)
			};
		case INC_QTY:
			return {
				...state,
				cartList: cartList.map((item) => {
					return item.id === id ? { ...item, qty: item.qty + 1 } : item;
				})
			};

		case DEC_QTY:
			return {
				...state,
				cartList: cartList.map((item) => {
					return item.id === id ? { ...item, qty: item.qty - 1 } : item;
				})
			};

		case REMOVE_CARTLIST_ITEM:
			return {
				...state,
				cartList: cartList.filter((item) => item.id === id)
			};

		case ADD_WISHLIST_ITEM:
			return {
				...state,
				wishList: wishList.concat(item)
			};
		case REMOVE_WISHLIST_ITEM:
			return {
				...state,
				wishList: wishList.filter((item) => item.id === id)
			};
		default:
			return state;
	}
};
