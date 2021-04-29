import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { AddToCartButton, Card, CardBody, CardFooter } from '../components'
import { useProducts } from '../context/productContext'
export const ProductDetail = () => {
  const { productId } = useParams()
  const { productsState, productsDispatch } = useProducts()
  const product = productsState.products.find(
    (product) => product.id === productId
  )
  const cardBuild = ({ id, inStock, ...rest }) => (
    <>
      <Card key={id}>
        <CardBody id={id} inStock={inStock} {...rest} />
        <CardFooter>
          {inStock && <AddToCartButton id={id} {...rest} inStock={inStock} />}
        </CardFooter>
      </Card>
    </>
  )
  return (
    <div>
      {product ? (
        <>
          <NavLink to='/products' className='navLink'>
            <button>Go Back</button>
          </NavLink>
          {cardBuild(product)}
        </>
      ) : (
        <>
          <div>
            <NavLink to='/products'>
              <button>Go Back</button>
            </NavLink>
            No Products found
          </div>
        </>
      )}
    </div>
  )
}
