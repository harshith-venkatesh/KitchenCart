export const SORT_BY_PRICE = "SORT_BY_PRICE"
export const INCLUDE_OUT_OF_STOCK = "INCLUDE_OUT_OF_STOCK"
export const ONLY_FAST_DELIVERY = "ONLY_FAST_DELIVERY"
export const PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW"
export const PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH"
export const PRICE_RANGE = "PRICE_RANGE"
export const SET_PRODUCTS = "SET_PRODUCTS"
export const productReducer = (state, { type, value, products }) => {
  switch (type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: products || [],
      }
    case SORT_BY_PRICE:
      return {
        ...state,
        [SORT_BY_PRICE]: value,
      }

    case INCLUDE_OUT_OF_STOCK:
      return {
        ...state,
        [INCLUDE_OUT_OF_STOCK]: !state[INCLUDE_OUT_OF_STOCK],
      }

    case ONLY_FAST_DELIVERY:
      return {
        ...state,
        [ONLY_FAST_DELIVERY]: !state[ONLY_FAST_DELIVERY],
      }
    case PRICE_RANGE:
      return {
        ...state,
        priceRange: value,
      }
    default:
      return state
  }
}
