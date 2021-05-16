import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import {
  AddToCartButton,
  Card,
  CardBody,
  CardFooter,
  WishListButton
} from '../components'
import { useProducts } from '../context/productContext'
export const ProductDetail = () => {
  const { productId } = useParams()
  const { productsState, productsDispatch } = useProducts()
  const product = productsState.products.find(
    (product) => product._id === productId
  )
  const cardBuild = (product) => {
    const ID = product._id
    const {
      image,
      name,
      price,
      offer,
      rating,
      idealFor,
      inStock,
      fastDelivery,
      category
    } = product
    return (
      <>
        <div className='single__product__main__container'>
          <div className='single__product__left__container'>
            <div className='single__product__left__container_main_image'>
              <img src={image} alt={ID} className='product__card__image'></img>
            </div>
            <div className='single__product__left__container_side_image'>
              <img src={image} alt={ID} className='product__card__image'></img>
              <img src={image} alt={ID} className='product__card__image'></img>
              <img src={image} alt={ID} className='product__card__image'></img>
            </div>
          </div>
          <div className='single__product__right__container'>
            <div className='single__product__title'>{name}</div>
            <div className='single__product__price'>{price}</div>
            <div className='single__product__description'>{offer}</div>
            <div className='product__card__rating'>
              <span>{rating}</span>
              <span>
                <i className='fa fa-star' />
              </span>
            </div>
            <div className='single__product__actions'>
              <AddToCartButton id={ID} {...product} />
              <WishListButton id={ID} {...product} route='product' />
            </div>
          </div>
        </div>
      </>
    )
  }
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
