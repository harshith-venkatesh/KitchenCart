import React, { useEffect } from "react"
import { CloseButton } from "../components/Button/Button"
import { Card, CardBody } from "../components/Card/Card"
import { useData } from "../context/dataContext"
import { useAxios } from "../customHooks/useAxios"
import {
  DEC_QTY,
  INC_QTY,
  REMOVE_CARTLIST_ITEM,
  SET_CARTLIST_ITEMS,
} from "../reducers/dataReducer"

const getTotalPrice = (items) => {
  return items.reduce((amount, { price, qty }) => amount + price * qty, 0)
}
export const Cart = ({ setRoute }) => {
  const { cartListItems, dataDispatch } = useData()
  const {
    getData: getCartData,
    deleteData: deleteCartData,
    isLoading,
  } = useAxios("/api/cartList")
  useEffect(() => {
    ;(async () => {
      if (cartListItems.length === 0) {
        const fetchCartItems = await getCartData()
        dataDispatch({ type: SET_CARTLIST_ITEMS, fetchCartItems })
      }
    })()
  }, [])

  const deleteCartItem = async (id) => {
    const success = await deleteCartData(id)
    console.log(success)
    if (success) {
      dataDispatch({ type: REMOVE_CARTLIST_ITEM, id })
    }
  }

  return (
    <React.Fragment>
      <div className="page-title">My Cart</div>
      <div className="cart__container">
        <div className="cart__container__listing">
          {cartListItems.length === 0 && (
            <div>
              Cart is Empty
              <button
                className="btn btn-solid-primary"
                onClick={() => setRoute("ProductListing")}
              >
                Continue Shopping
              </button>
            </div>
          )}
          {cartListItems.map(({ id, qty, ...rest }) => (
            <Card key={id}>
              <CloseButton
                onClick={() => {
                  deleteCartItem(id)
                }}
              />
              <CardBody {...rest} cartHorizontal={true} />
              <div className="cart__container__action">
                <button
                  className="btn"
                  onClick={() => {
                    qty > 1
                      ? dataDispatch({ type: DEC_QTY, id })
                      : deleteCartItem(id)
                  }}
                >
                  {qty > 1 ? (
                    <i className="fa fa-minus"></i>
                  ) : (
                    <i className="fa fa-trash"></i>
                  )}
                </button>

                <span className="">{qty}</span>
                <button
                  className="btn "
                  onClick={() => {
                    dataDispatch({ type: INC_QTY, id })
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </Card>
          ))}
        </div>
        <div className="cart__container__billing">
          <div>Total: Rs. {getTotalPrice(cartListItems)}</div>
        </div>
      </div>
    </React.Fragment>
  )
}
