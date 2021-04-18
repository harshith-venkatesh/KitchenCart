import { useState } from "react"
import { useProducts } from "../context/productContext"
import { SEARCH_PRODUCT } from "../reducers/productReducer"

export const SearchCard = () => {
  const [searchParam, setSearchParam] = useState("")
  const { productsDispatch } = useProducts()
  const searchProducts = () => {
    productsDispatch({
      type: SEARCH_PRODUCT,
      value: searchParam.toLowerCase(),
    })
  }

  const searchProductsOnEnter = (e) => {
    if (e.key === "Enter") {
      searchProducts()
    }
  }
  const clearSearchResult = () => {
    setSearchParam("")
    productsDispatch({ type: SEARCH_PRODUCT, value: "" })
  }
  return (
    <>
      <div className="search__input">
        <div className="search__input__data">
          <input
            className="input"
            type="text"
            placeholder="Search For Products"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            onKeyDown={searchProductsOnEnter}
          ></input>
          {searchParam.length !== 0 && (
            <div className="btn--clear">
              <i className="fa fa-times" onClick={clearSearchResult}></i>
            </div>
          )}
        </div>
        <button className="btn--search" onClick={searchProducts}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </>
  )
}
