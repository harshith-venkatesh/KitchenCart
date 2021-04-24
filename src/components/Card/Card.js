export const Card = ({ children }) => (
  <div className="product__card">{children}</div>
);

export const CardFooter = ({ children }) => <>{children}</>;

export const CardBody = ({
  name,
  image,
  price,
  inStock,
  fastDelivery,
  rating,
  offers,
  idealFor
}) => (
  <div className={"product__card___body"}>
    <img src={image} alt={name} className="product__card__image" />
    <div className="p-1">
      <h4>{name}</h4>
      <p>Rs. {price}</p>

      <div>{rating}</div>
      <div>{idealFor}</div>
      {inStock ? <div>In Stock</div> : <div> Out of Stock</div>}
      {fastDelivery ? <div>Fast Delivery</div> : <div>Delivery in 2 days</div>}
    </div>
  </div>
);
