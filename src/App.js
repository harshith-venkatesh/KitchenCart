import { useState } from 'react'
import { NavBar } from './components'
import { Cart, Home, ProductListing, WishList } from './pages'
import { ToastContainer } from 'react-toastify'
import './styles.css'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <>
      <div className='navbar sticky'>
        <NavBar />
      </div>
      <ToastContainer />
      <div className='ecomm__container'>
        <Routes>
        <Route path='/' element={<ProductListing />} />
          <Route path='/products' element={<ProductListing />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishList' element={<WishList />} />
          <Route path="*" element={<ProductListing />} />

        </Routes>
      </div>
    </>
  )
}
