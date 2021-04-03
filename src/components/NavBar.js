import React from "react";

export const NavBar = ({ route, setRoute }) => {
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
						<span className="header-title-name">Kitchen Cart</span>
					</div>
				</div>
				<div>
					<div>
						<button
							className={
								route === "ProductListing"
									? "btn bg-primary"
									: "btn bg-secondary"
							}
							onClick={() => setRoute("ProductListing")}
						>
							Products
						</button>
						<button
							className={
								route === "Cart" ? "btn bg-primary" : "btn bg-secondary"
							}
							onClick={() => setRoute("Cart")}
						>
							Cart
						</button>
						<button
							className={
								route === "WishList" ? "btn bg-primary" : "btn bg-secondary"
							}
							onClick={() => setRoute("WishList")}
						>
							WishList
						</button>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
};
