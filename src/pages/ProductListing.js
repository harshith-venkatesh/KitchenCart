import React, { useEffect } from "react"
import { useProducts } from "../context/productContext"
import {
  INCLUDE_OUT_OF_STOCK,
  ONLY_FAST_DELIVERY,
  PRICE_HIGH_TO_LOW,
  SET_PRODUCTS,
  SORT_BY_PRICE,
} from "../reducers/productReducer"

import { Card, CardBody, CardFooter } from "../components/Card/Card"
import { AddToCartButton, WishListButton } from "../components/Button/Button"
import { Filter } from "../components"
import { useAxios } from "../customHooks/useAxios"

const tranformProducts = (state) => {
  const sortCheck = state[SORT_BY_PRICE]

  let sortedProducts = state.products
  console.log(state.products)
  if (sortCheck) {
    sortedProducts = sortedProducts.sort((a, b) =>
      sortCheck === PRICE_HIGH_TO_LOW ? b.price - a.price : a.price - b.price
    )
  }

  let filteredProducts = sortedProducts
  if (!state[INCLUDE_OUT_OF_STOCK]) {
    filteredProducts = sortedProducts.filter((product) => product.inStock)
  }
  let priceRangeProducts = filteredProducts
  if (state[ONLY_FAST_DELIVERY]) {
    priceRangeProducts = filteredProducts.filter(
      (product) => product.fastDelivery
    )
  }
  let finalProducts = priceRangeProducts
  console.log(state)

  console.log(state.priceRange)
  console.log(finalProducts)
  finalProducts = priceRangeProducts.filter((product) => {
    return product.price < state.priceRange
  })
  console.log(finalProducts)
  return finalProducts
}

export const ProductListing = ({ setRoute }) => {
  const { productsState, productsDispatch } = useProducts()
  const { getData: getProductsData, isLoading } = useAxios(
    "/api/productListItem"
  )
  useEffect(() => {
    ;async () => {
      if (productsState.products.length === 0) {
        const products = await getProductsData()
        console.log({ products })
        productsDispatch({ type: SET_PRODUCTS, products })
      }
    }
    return () => {
      console.log("products listing")
    }
  }, [])
  return (
    <>
      <div className="page-title">Product Listing</div>

      <div className="container">
        <div className="sidenav-container">
          <Filter />
        </div>
        <div className="component-container">
          <div className="product-container">
            {tranformProducts(productsState).map(({ id, inStock, ...rest }) => (
              <Card key={id}>
                <WishListButton id={id} inStock={inStock} {...rest} />
                <CardBody inStock={inStock} {...rest} />
                <CardFooter>
                  {inStock && (
                    <AddToCartButton
                      setRoute={setRoute}
                      renderPage={"ProductListing"}
                      id={id}
                      {...rest}
                    />
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
