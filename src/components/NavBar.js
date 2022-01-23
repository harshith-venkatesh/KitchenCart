import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { CART_URL, WISHLIST_URL } from '../congif/baseUrls'
import { useData } from '../context/dataContext'
import { useProducts } from '../context/productContext'
import { useAxios } from '../customHooks/useAxios'
import { SET_CARTLIST_ITEMS, SET_WISHLIST_ITEMS } from '../reducers/dataReducer'

import { SearchCard } from './SearchCard'
import logo from '../assets/logo.png'

export const NavBar = () => {
  const { productsState, productsDispatch } = useProducts()
  const { cartListItems, wishListItems, dataDispatch } = useData()
  const { getData: getCartData } = useAxios(CART_URL)
  const { getData: getWishListData } = useAxios(WISHLIST_URL)
  useEffect(() => {
    ;(async () => {
      
      if (cartListItems.length === 0) {
        const { cartListItems } = await getCartData()
        
        dataDispatch({ type: SET_CARTLIST_ITEMS, fetchCartList: cartListItems })
      }
      if (wishListItems.length === 0) {
        const { wishListItems } = await getWishListData()
        
        dataDispatch({
          type: SET_WISHLIST_ITEMS,
          fetchWishList: wishListItems
        })
      }
    })()
  }, [])
  return (
    <React.Fragment>
      <nav className='navbar-container pr--two'>
        <NavLink className='navLink' to='/products'>
          <div className='header-logo'>
            <img
              className='header-image'
              src={logo}
              alt='Shankha'
            />
            <div className='header-title'>
              <span>Kitchen Cart</span>
            </div>
          </div>
        </NavLink>
        <SearchCard />

        <div className='icons__container'>
          <div className='pr--half'>
            <NavLink to='/home' className='badge-icon-container navLink'>
              <i className='fa fa-home fa-2x'></i>
            </NavLink>
          </div>
          <div className='pr--half'>
            <NavLink to='/cart' className='badge-icon-container navLink'>
              <>
                <i className='fa fa-shopping-cart  fa-2x'></i>
                {cartListItems.length > 0 ? (
                  <span className='status-badge status-badge-number'>
                    {cartListItems.length}
                  </span>
                ) : null}
              </>
            </NavLink>
          </div>
          <div className='pr--half'>
            <NavLink to='/wishList' className='badge-icon-container navLink'>
              <i className='fa fa-heart fa-2x'></i>
              {wishListItems.length > 0 ? (
                <span className='status-badge status-badge-number'>
                  {wishListItems.length}
                </span>
              ) : null}
            </NavLink>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}
