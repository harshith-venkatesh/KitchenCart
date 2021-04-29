import { Link, NavLink } from 'react-router-dom'
import { WishListButton } from '../Button/Button'

export const Card = ({ children }) => (
  <div className='product__card'>{children}</div>
)

export const CardFooter = ({ children }) => <>{children}</>

export const CardBody = ({ id, inStock, image, rating, ...rest }) => (
  <div className={'product__card___body'}>
    <div className='product__card__image__container'>
      <img src={image} alt={id} className='product__card__image'></img>
      <WishListButton
        id={id}
        inStock={inStock}
        image={image}
        rating={rating}
        {...rest}
      />
      <span className='product__card__rating--placement'>
        <div className='product__card__rating'>
          <span>{rating}</span>
          <span>
            <i className='fa fa-star' />
          </span>
        </div>
      </span>
    </div>
    <CardDetails id={id} inStock={inStock} rating={rating} {...rest} />
  </div>
)

export const CardDetails = ({
  id,
  name,
  price,
  rating,
  idealFor,
  inStock,
  fastDelivery
}) => (
  <NavLink to={`/products/${id}`} className='navLink--product'>
    <div className='p-1'>
      <h4>{name}</h4>
      <p>Rs. {price}</p>
      <div>{idealFor}</div>
      {inStock ? <div>In Stock</div> : <div> Out of Stock</div>}
      {fastDelivery ? <div>Fast Delivery</div> : <div>Delivery in 2 days</div>}
    </div>
  </NavLink>
)
