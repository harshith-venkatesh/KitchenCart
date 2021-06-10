import {
  INCLUDE_OUT_OF_STOCK,
  ONLY_FAST_DELIVERY,
  PRICE_HIGH_TO_LOW,
  SORT_BY_PRICE
} from '../reducers/productReducer'

export const getSortedData = (state, data) => {
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

export const getFilteredData = (state, data) => {
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
