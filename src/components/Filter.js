import { useProducts } from "../context/productContext"
import {
  INCLUDE_OUT_OF_STOCK,
  ONLY_FAST_DELIVERY,
  PRICE_HIGH_TO_LOW,
  PRICE_LOW_TO_HIGH,
  PRICE_RANGE,
  SORT_BY_PRICE,
} from "../reducers/productReducer"

export const Filter = () => {
  const { productsState, productsDispatch } = useProducts()
  return (
    <>
      <div className="mt--1">
        <fieldset className="p-1">
          <legend>Price</legend>
          <div>
            <label htmlFor={PRICE_HIGH_TO_LOW} className="pr-2">
              <input
                checked={productsState[SORT_BY_PRICE] === PRICE_HIGH_TO_LOW}
                type="radio"
                name={SORT_BY_PRICE}
                id={PRICE_HIGH_TO_LOW}
                onChange={() => {
                  productsDispatch({
                    type: SORT_BY_PRICE,
                    value: PRICE_HIGH_TO_LOW,
                  })
                }}
              />
              High To Low
            </label>
          </div>
          <div>
            <label htmlFor={PRICE_LOW_TO_HIGH} className="pr-1">
              <input
                checked={productsState[SORT_BY_PRICE] === PRICE_LOW_TO_HIGH}
                type="radio"
                name={SORT_BY_PRICE}
                id={PRICE_LOW_TO_HIGH}
                onChange={() => {
                  productsDispatch({
                    type: SORT_BY_PRICE,
                    value: PRICE_LOW_TO_HIGH,
                  })
                }}
              />
              Low To High
            </label>
          </div>
          <div>
            {" "}
            <label htmlFor={PRICE_LOW_TO_HIGH} className="pr-1">
              Price under {productsState.priceRange}
              <input
                min={100}
                max={1000}
                step={50}
                value={productsState.priceRange}
                type="range"
                name={PRICE_RANGE}
                id={PRICE_RANGE}
                onChange={(e) => {
                  productsDispatch({
                    type: PRICE_RANGE,
                    value: Number(e.target.value),
                  })
                }}
              />
            </label>
          </div>{" "}
        </fieldset>
      </div>
      <div className="mb-1">
        <fieldset className="p-1">
          <legend>Filters</legend>
          <div>
            <label htmlFor={INCLUDE_OUT_OF_STOCK} className="pr-1">
              <input
                type="checkbox"
                checked={productsState[INCLUDE_OUT_OF_STOCK]}
                id={INCLUDE_OUT_OF_STOCK}
                onChange={() =>
                  productsDispatch({ type: INCLUDE_OUT_OF_STOCK })
                }
              />
              Include Out of Stock
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={productsState[ONLY_FAST_DELIVERY]}
              id={ONLY_FAST_DELIVERY}
              onChange={() => productsDispatch({ type: ONLY_FAST_DELIVERY })}
            />
            <label htmlFor={ONLY_FAST_DELIVERY}>Include Fast Delivery</label>
          </div>
        </fieldset>
      </div>
    </>
  )
}
