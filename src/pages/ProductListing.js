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
  if (state.searchParam.length !== 0) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(state.searchParam)
    )
  }
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
  finalProducts = priceRangeProducts.filter((product) => {
    return product.price < state.priceRange
  })
  return finalProducts
}

export const ProductListing = ({ setRoute }) => {
  const { productsState, productsDispatch } = useProducts()
  const { getData: getProductsData, isLoading } = useAxios("/api/productList")
  useEffect(() => {
    ;(async () => {
      if (productsState.products.length === 0) {
        const products = await getProductsData()
        productsDispatch({ type: SET_PRODUCTS, products })
      }
    })()
    return () => {
      console.log("Moving out of products listing component")
    }
  }, [])
  return (
    <>
      <div className="page__title">Product Listing</div>
      {isLoading ? (
        <div className="page__loader"></div>
      ) : (
        <div className="container">
          <div className="sidenav-container">
            <Filter />
          </div>
          <div className="component-container">
            <div className="product__container">
              <React.Fragment>
                {tranformProducts(productsState).map(
                  ({ id, inStock, ...rest }) => (
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
                            inStock={inStock}
                          />
                        )}
                      </CardFooter>
                    </Card>
                  )
                )}
              </React.Fragment>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
