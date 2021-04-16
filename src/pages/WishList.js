import React from "react"
import { AddToCartButton, CloseButton } from "../components/Button/Button"
import { Card, CardBody, CardFooter } from "../components/Card/Card"
import { useData } from "../context/dataContext"
import { REMOVE_WISHLIST_ITEM } from "../reducers/dataReducer"

export const WishList = ({ setRoute }) => {
  const { wishListItems, dataDispatch } = useData()

  return (
    <React.Fragment>
      <div className="page-title">My WishList</div>
      {wishListItems.length === 0 && (
        <div>
          WishList is Empty
          <button
            className="btn btn-solid-primary"
            onClick={() => setRoute("ProductListing")}
          >
            Continue Shopping
          </button>
        </div>
      )}
      <div className="cart__container">
        <div className="product-container">
          {wishListItems.map(({ id, ...rest }) => (
            <Card key={id}>
              <CloseButton
                onClick={() => dataDispatch({ type: REMOVE_WISHLIST_ITEM, id })}
              />
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
    </React.Fragment>
  )
}
