export const SORT_BY_PRICE = "sortByPrice";
export const INCLUDE_OUT_OF_STOCK = "ïncludeOutOfStock";
export const ONLY_FAST_DELIVERY = "onlyFastDelivery";
export const productReducer = (state, { type, value }) => {
	switch (type) {
		case SORT_BY_PRICE:
			return {
				...state,
				[SORT_BY_PRICE]: value
			};

		case INCLUDE_OUT_OF_STOCK:
			return {
				...state,
				[INCLUDE_OUT_OF_STOCK]: !state[INCLUDE_OUT_OF_STOCK]
			};

		case ONLY_FAST_DELIVERY:
			return {
				...state,
				[ONLY_FAST_DELIVERY]: !state[ONLY_FAST_DELIVERY]
			};
		default:
			return state;
	}
};
