import React, { useEffect } from "react"
import { AddToCartButton, CloseButton } from "../components/Button/Button"
import { Card, CardBody, CardFooter } from "../components/Card/Card"
import { useData } from "../context/dataContext"
import { useAxios } from "../customHooks/useAxios"
import { REMOVE_WISHLIST_ITEM } from "../reducers/dataReducer"

export const WishList = ({ setRoute }) => {
  const { wishListItems, dataDispatch } = useData()
  const { getData: getWishListData, isLoading } = useAxios("/api/wishList")
  const {
    deleteData: deleteWishListData,
    isLoading: deleteWishListLoading,
  } = useAxios("/api/wishList")
  useEffect(() => {
    ;(async () => {
      if (wishListItems.length === 0) {
        const fetchWishListData = await getWishListData()
        dataDispatch({ type: SET_WISHLIST_ITEMS, fetchWishListData })
      }
    })()
  }, [])

  const deleteWishListItem = (id) => {
    (async () => {
      const success = await deleteWishListData(id)
      if (success) {
        dataDispatch({ type: REMOVE_WISHLIST_ITEM, id })
      }
    })()
  }
  return (
    <React.Fragment>
      <div className="page__title">My WishList</div>
      {isLoading ? (
        <div className="page__loader"></div>
      ) : (
        <div>
          {wishListItems.length === 0 && (
            <div className="empty__data__area">
              <i className="fa fa-heart empty__icon"></i>
              <div>
                Wish List is Empty
                <button
                  className="btn btn-solid-primary"
                  onClick={() => setRoute("ProductListing")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
          <div className="cart__container">
            <div className="product__container">
              {wishListItems.map(({ id, ...rest }) => (
                <Card key={id}>
                  <CloseButton onClick={() => deleteWishListItem(id)} />
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
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
