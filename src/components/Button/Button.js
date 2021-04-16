import { useData } from "../../context/dataContext"
import { useAxios } from "../../customHooks/useAxios"
import {
  ADD_CARTLIST_ITEM,
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
} from "../../reducers/dataReducer"
import { checkItem } from "../../utils/checkItem"

export const CloseButton = ({ onClick }) => (
  <div className="product-card-badge" onClick={onClick}>
    <i className="fa fa-times"></i>
  </div>
)

export const AddToCartButton = ({ setRoute, renderPage, id, ...rest }) => {
  const { cartListItems, dataDispatch } = useData()
  const { postData, isLoading } = useAxios("/api/cart")

  const postCartData = async () => {
    console.log("button check")
    const item = await postData({ id, qty: 1, ...rest })
    dataDispatch({
      type: ADD_CARTLIST_ITEM,
      item,
    })
  }
  const handleClick = () => {
    if (checkItem(cartListItems, id)) {
      setRoute("Cart")
    } else {
      postCartData()
    }
  }
  return (
    <button
      disabled={isLoading}
      className="btn btn-solid-primary"
      onClick={handleClick}
    >
      {checkItem(cartListItems, id) ? "Go To Cart" : "Add To Cart"}
    </button>
  )
}

const setWishListButtonClass = (wishListItems, id) => {
  return checkItem(wishListItems, id)
    ? "product-card-badge red btn-close"
    : "product-card-badge gray btn-close"
}
export const WishListButton = ({ id, ...rest }) => {
  const { wishListItems, dataDispatch } = useData()
  const handleClick = () => {
    checkItem(wishListItems, id)
      ? dataDispatch({
          type: REMOVE_WISHLIST_ITEM,
          id,
        })
      : dataDispatch({
          type: ADD_WISHLIST_ITEM,
          item: { id, ...rest },
        })
  }

  return (
    <div
      className={setWishListButtonClass(wishListItems, id)}
      onClick={handleClick}
    >
      <i className="fa fa-heart"></i>
    </div>
  )
}
//operatin button
