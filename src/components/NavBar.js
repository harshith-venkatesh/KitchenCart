import React from "react"
import { useData } from "../context/dataContext"
import { SearchCard } from "./SearchCard"

export const NavBar = ({ route, setRoute }) => {
  const { cartListItems, wishListItems } = useData()
  console.log({ cartListItems, wishListItems })
  return (
    <React.Fragment>
      <nav className="navbar-container ">
        <div
          className="header-logo "
          onClick={() => setRoute("ProductListing")}
        >
          <img
            className="header-image"
            src="https://mythologyandvaishbhat.files.wordpress.com/2020/07/shankh.png?w=500"
            alt="Shankha"
          />
          <div className="header-title">
            <span>Kitchen Cart</span>
          </div>
        </div>
        <SearchCard />

        <div className="icons-container">
          <div className="pr-half">
            <div
              className="badge-icon-container "
              onClick={() => setRoute("ProductListing")}
            >
              <i className="fa fa-home fa-2x"></i>
              {/* <p style={{ fontSize: "0.6rem", textAlign: "center" }}>
								Products
							</p> */}
            </div>
          </div>
          <div className="pr-half">
            <div
              className="badge-icon-container "
              onClick={() => setRoute("Cart")}
            >
              <>
                <i className="fa fa-shopping-cart  fa-2x"></i>
                {cartListItems.length > 0 ? (
                  <span className="status-badge status-badge-number">
                    {cartListItems.length}
                  </span>
                ) : null}
              </>
              {/* <p style={{ fontSize: "0.6rem", textAlign: "center" }}>Cart</p> */}
            </div>
          </div>
          <div className="pr-1">
            <div
              className="badge-icon-container"
              onClick={() => setRoute("WishList")}
            >
              <i className="fa fa-heart fa-2x"></i>
              {wishListItems.length > 0 ? (
                <span className="status-badge status-badge-number">
                  {wishListItems.length}
                </span>
              ) : null}
              {/* <p style={{ fontSize: "0.6rem", textAlign: "center" }}>WishList</p> */}
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}
