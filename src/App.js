import { useState } from 'react'
import { NavBar } from './components'
import { Cart, Home, ProductListing, WishList, ProductDetail } from './pages'
import { ToastContainer } from 'react-toastify'
import './styles.css'
import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'

export default function App() {
  const login = false
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
          <Route path='/products/:productId' element={<ProductDetail />} />
          {login && <Route path='/cart' element={<Cart />} />}
          {login && <Route path='/wishList' element={<WishList />} />}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<ProductListing />} />
        </Routes>
      </div>
    </>
  )
}
