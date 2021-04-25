import React, { useEffect } from 'react'
import { CloseButton } from '../components/Button/Button'
import { Card, CardBody } from '../components/Card/Card'
import { useData } from '../context/dataContext'
import { useAxios } from '../customHooks/useAxios'
import {
  DEC_QTY,
  INC_QTY,
  REMOVE_CARTLIST_ITEM,
  SET_CARTLIST_ITEMS
} from '../reducers/dataReducer'
import { useNavigate } from 'react-router-dom'
const getTotalPrice = (items) => {
  return items.reduce(
    (amount, { inStock, price, qty }) => amount + price * qty * inStock,
    0
  )
}
export const Cart = () => {
  let navigate = useNavigate()
  const { cartListItems, dataDispatch } = useData()
  const { getData: getCartData, isLoading } = useAxios('/api/cartList')
  const {
    deleteData: deleteCartData,
    isLoading: isDeleteDataLoading
  } = useAxios('/api/cartList')

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
    if (success) {
      dataDispatch({ type: REMOVE_CARTLIST_ITEM, id })
    }
  }

  const invoiceGenerator = () => {
    return (
      <>
        {getTotalPrice(cartListItems) !== 0 && (
          <div className='invoice__division'>
            <div className='invoice__division__header'>
              There are {cartListItems.length} Items
            </div>
            <div className='invoice__division__list'>
              <span>Total Amount:</span>{' '}
              <span>&#8377; {getTotalPrice(cartListItems)}/-</span>
            </div>
            <div className='invoice__division__list'>
              <span>Delivery Charges:</span>
              {getTotalPrice(cartListItems) < 3000 ? (
                <span> &#8377; 50/-</span>
              ) : (
                <span> &#8377; 0/-</span>
              )}
            </div>
            <div className='invoice__division__total'>
              <span> TOTAL:</span>
              <span>
                {' '}
                &#8377;{' '}
                {Number(getTotalPrice(cartListItems)) < 3000
                  ? Number(getTotalPrice(cartListItems)) + 50
                  : Number(getTotalPrice(cartListItems))}
                /-
              </span>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <React.Fragment>
      <div className='page__title'>My Cart</div>
      {isLoading ? (
        <div className='page__loader'></div>
      ) : (
        <>
          {cartListItems.length === 0 && (
            <div className='empty__data__area'>
              <i className='fa fa-shopping-cart empty__icon'></i>
              <div>
                Cart is Empty
                <button
                  className='btn btn-solid-primary'
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
          <div className='cart__container'>
            <div className='cart__container__listing'>
              {cartListItems.map(({ id, qty, ...rest }) => (
                <Card key={id}>
                  <CardBody {...rest} />
                  <div className='cart__container__action'>
                    <button
                      className='btn'
                      onClick={() => {
                        qty > 1
                          ? dataDispatch({ type: DEC_QTY, id })
                          : deleteCartItem(id)
                      }}
                    >
                      {qty > 1 ? (
                        <i className='fa fa-minus'></i>
                      ) : (
                        <i className='fa fa-trash'></i>
                      )}
                    </button>

                    <span className=''>{qty}</span>
                    <button
                      className='btn '
                      onClick={() => {
                        dataDispatch({ type: INC_QTY, id })
                      }}
                    >
                      <i className='fa fa-plus'></i>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            <div className='cart__container__billing'>{invoiceGenerator()}</div>
          </div>
        </>
      )}
    </React.Fragment>
  )
}
