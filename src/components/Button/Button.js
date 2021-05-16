import { useData } from '../../context/dataContext'
import { useAxios } from '../../customHooks/useAxios'
import {
  ADD_CARTLIST_ITEM,
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM
} from '../../reducers/dataReducer'
import { checkItem } from '../../utils/checkItem'
import { useNavigate } from 'react-router-dom'
import { CART_URL, WISHLIST_URL } from '../../congif/baseUrls'

export const CloseButton = ({ onClick }) => (
  <div className='product__card__badge' onClick={onClick}>
    <i className='fa fa-times'></i>
  </div>
)

export const AddToCartButton = ({ id, ...rest }) => {
  let navigate = useNavigate()
  console.log(id, rest)
  const { cartListItems, dataDispatch } = useData()
  const { postData, isLoading } = useAxios(CART_URL)

  const postCartData = async () => {
    const item = await postData({ id, qty: 1, ...rest })
    console.log({ item })
    if (item !== undefined) {
      console.log('dispatch')
      dataDispatch({
        type: ADD_CARTLIST_ITEM,
        item: { id, qty: 1, ...rest }
      })
    }
  }
  console.log(checkItem(cartListItems, id))
  console.log(cartListItems, id)
  return (
    <button
      disabled={isLoading}
      className='btn btn-outline-primary'
      onClick={() =>
        checkItem(cartListItems, id) ? navigate('/cart') : postCartData()
      }
    >
      {isLoading
        ? 'Adding to Cart...'
        : checkItem(cartListItems, id)
        ? 'Go To Cart'
        : 'Add To Cart'}
    </button>
  )
}

const setWishListButtonClass = (wishListItems, id) => {
  return checkItem(wishListItems, id)
    ? 'product__card__badge red btn-close'
    : 'product__card__badge white btn-close'
}
export const WishListButton = ({ id, route, ...rest }) => {
  const { wishListItems, dataDispatch } = useData()
  const {
    postData: postWishListData,
    deleteData: deleteWishListData,
    isLoading
  } = useAxios(WISHLIST_URL)
  const handleClick = () => {
    if (checkItem(wishListItems, id)) {
      ;(async () => {
        const deleteSuccess = await deleteWishListData(id)
        if (deleteSuccess) {
          dataDispatch({
            type: REMOVE_WISHLIST_ITEM,
            id
          })
        }
      })()
    } else {
      ;(async () => {
        const item = await postWishListData({ id, ...rest })
        dataDispatch({
          type: ADD_WISHLIST_ITEM,
          item: { id, ...rest }
        })
      })()
    }
  }

  return (
    <div>
      {route === 'product' ? (
        <button
          disabled={isLoading}
          className='btn btn-outline-primary'
          onClick={handleClick}
        >
          {isLoading
            ? 'Adding to WishList...'
            : checkItem(wishListItems, id)
            ? 'Go To WishList'
            : 'Add To WishList'}
        </button>
      ) : (
        <div
          className={setWishListButtonClass(wishListItems, id)}
          onClick={handleClick}
        >
          <i className='fa fa-heart'></i>
        </div>
      )}
    </div>
  )
}
