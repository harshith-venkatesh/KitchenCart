import { useData } from '../../context/dataContext'
import { useAxios } from '../../customHooks/useAxios'
import {
  ADD_CARTLIST_ITEM,
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM
} from '../../reducers/dataReducer'
import { checkItem } from '../../utils/checkItem'
import { useNavigate } from 'react-router-dom'

export const CloseButton = ({ onClick }) => (
  <div className='product__card__badge' onClick={onClick}>
    <i className='fa fa-times'></i>
  </div>
)

export const AddToCartButton = ({ id, ...rest }) => {
  let navigate = useNavigate()
  const { cartListItems, dataDispatch } = useData()
  const { postData, isLoading } = useAxios('/api/cartList')

  const postCartData = async () => {
    const item = await postData({ id, qty: 1, ...rest })
    console.log(item)
    if (item) {
      dataDispatch({
        type: ADD_CARTLIST_ITEM,
        item: { id, qty: 1, ...rest }
      })
    }
  }
  const handleClick = () => {
    if (checkItem(cartListItems, id)) {
      navigate('/cart')
    } else {
      postCartData()
    }
  }
  return (
    <button
      disabled={isLoading}
      className='btn btn-outline-primary'
      onClick={handleClick}
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
    : 'product__card__badge gray btn-close'
}
export const WishListButton = ({ id, ...rest }) => {
  const { wishListItems, dataDispatch } = useData()
  const {
    postData: postWishListData,
    deleteData: deleteWishListData
  } = useAxios('/api/wishList')
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
    <div
      className={setWishListButtonClass(wishListItems, id)}
      onClick={handleClick}
    >
      <i className='fa fa-heart'></i>
    </div>
  )
}
