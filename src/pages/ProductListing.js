import React, { useEffect, useState } from 'react'
import { useProducts } from '../context/productContext'
import {
  INCLUDE_OUT_OF_STOCK,
  ONLY_FAST_DELIVERY,
  PRICE_HIGH_TO_LOW,
  SET_PRODUCTS,
  SORT_BY_PRICE
} from '../reducers/productReducer'

import {
  AddToCartButton,
  Card,
  CardBody,
  CardFooter,
  Filter,
  WishListButton
} from '../components'
import { useAxios } from '../customHooks/useAxios'

const getSortedData = (state, data) => {
  const sortCheck = state[SORT_BY_PRICE]
  console.log(sortCheck, data)
  if (sortCheck) {
    data = [...data].sort((a, b) =>
      sortCheck === PRICE_HIGH_TO_LOW ? b.price - a.price : a.price - b.price
    )
    console.log(data)
  }
  return data
}

const getFilteredData = (state, data) => {
  if (state.searchParam.length !== 0) {
    data = [...data].filter((product) =>
      product.name.toLowerCase().includes(state.searchParam)
    )
  }
  if (!state[INCLUDE_OUT_OF_STOCK]) {
    data = [...data].filter((product) => product.inStock)
  }
  if (state[ONLY_FAST_DELIVERY]) {
    data = [...data].filter((product) => product.fastDelivery)
  }
  data = [...data].filter((product) => {
    return product.price < state.priceRange
  })
  return data
}

export const ProductListing = () => {
  const { productsState, productsDispatch } = useProducts()
  const sortedData = getSortedData(productsState, productsState.products)
  const filteredProducts = getFilteredData(productsState, sortedData)
  const { getData: getProductsData, isLoading } = useAxios('/api/productList')
  const [sideNav, setSideNav] = useState(false)
  useEffect(() => {
    ;(async () => {
      if (productsState.products.length === 0) {
        const products = await getProductsData()
        productsDispatch({ type: SET_PRODUCTS, products })
      }
    })()
    return () => {
      console.log('Moving out of products listing component')
    }
  }, [])
  return (
    <>
      <div className='page__title'>
        All Products
        <i
          className='fa fa-filter'
          onClick={() => setSideNav((prev) => !prev)}
        ></i>
      </div>
      {isLoading ? (
        <div className='page__loader'></div>
      ) : (
        <div className='container'>
          <div className='sidenav-container'>
            <div
              className={sideNav === true ? 'sideBarMenuActive' : 'sidebarMenu'}
            >
              <Filter />
            </div>
          </div>
          <div className='component-container'>
            <div className='product__container'>
              <React.Fragment>
                {filteredProducts.map(({ id, inStock, ...rest }) => (
                  <Card key={id}>
                    <CardBody id={id} inStock={inStock} {...rest} />
                    <CardFooter>
                      {inStock && (
                        <AddToCartButton id={id} {...rest} inStock={inStock} />
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </React.Fragment>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
