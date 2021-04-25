import React from 'react'
import { NavLink } from 'react-router-dom'
import { useData } from '../context/dataContext'
import { SearchCard } from './SearchCard'

export const NavBar = () => {
  const { cartListItems, wishListItems } = useData()
  return (
    <React.Fragment>
      <nav className='navbar-container pr--two'>
        <NavLink className='navLink' to='/products'>
          <div className='header-logo'>
            <img
              className='header-image'
              src='https://mythologyandvaishbhat.files.wordpress.com/2020/07/shankh.png?w=500'
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
            <NavLink to='/products' className='badge-icon-container navLink'>
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
