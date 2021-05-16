export const initialData = {
  cartListItems: [],
  wishListItems: []
}

export const INC_QTY = 'INC_QTY'
export const DEC_QTY = 'DEC_QTY'
export const SET_CARTLIST_ITEMS = 'SET_CARTLIST_ITEMS'
export const ADD_CARTLIST_ITEM = 'ADD_CARTLIST_ITEM'
export const REMOVE_CARTLIST_ITEM = 'REMOVE_CARTLIST_ITEM'

export const SET_WISHLIST_ITEMS = 'SET_WISHLIST_ITEMS'
export const ADD_WISHLIST_ITEM = 'ADD_WISHLIST_ITEM'
export const REMOVE_WISHLIST_ITEM = 'REMOVE_WISHLIST_ITEM'

export const dataReducer = (
  state,
  { type, id, item, fetchCartList, fetchWishList }
) => {
  const { cartListItems, wishListItems } = state
  console.log({ state })
  console.log({ fetchCartList })
  switch (type) {
    case SET_CARTLIST_ITEMS:
      return {
        ...state,
        cartListItems: fetchCartList || []
      }

    case ADD_CARTLIST_ITEM:
      return {
        ...state,
        cartListItems: cartListItems.concat(item)
      }

    case REMOVE_CARTLIST_ITEM:
      return {
        ...state,
        cartListItems: cartListItems.filter((item) => item.id !== id)
      }

    case INC_QTY:
      return {
        ...state,
        cartListItems: cartListItems.map((item) => {
          return item.id === id ? { ...item, qty: item.qty + 1 } : item
        })
      }

    case DEC_QTY:
      return {
        ...state,
        cartListItems: cartListItems.map((item) => {
          return item.id === id ? { ...item, qty: item.qty - 1 } : item
        })
      }

    case SET_WISHLIST_ITEMS:
      return {
        ...state,
        wishListItems: fetchWishList || []
      }

    case ADD_WISHLIST_ITEM:
      return {
        ...state,
        wishListItems: wishListItems.concat(item)
      }

    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishListItems: wishListItems.filter((item) => item.id !== id)
      }

    default:
      return state
  }
}
