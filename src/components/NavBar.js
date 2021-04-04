import React from "react";
import { useData } from "../context/dataContext";

export const NavBar = ({ route, setRoute }) => {
	const { cartList, wishList } = useData();
	console.log({ cartList });
	return (
		<React.Fragment>
			<nav className="navbar-container">
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

				<div className="icons-container">
					<div className="pr-0.5">
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
					<div className="pr-0.5">
						<div
							className="badge-icon-container "
							onClick={() => setRoute("Cart")}
						>
							<>
								<i className="fa fa-shopping-cart  fa-2x"></i>
								{cartList.length > 0 ? (
									<span className="status-badge status-badge-number">
										{cartList.length}
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
							{wishList.length > 0 ? (
								<span className="status-badge status-badge-number">
									{wishList.length}
								</span>
							) : null}
							{/* <p style={{ fontSize: "0.6rem", textAlign: "center" }}>WishList</p> */}
						</div>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
};
