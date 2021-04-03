import { useState } from "react";
import { NavBar } from "./components";
import { Cart, Home, ProductListing, WishList } from "./pages";

import "./styles.css";

export default function App() {
	const [route, setRoute] = useState("ProductListing");
	return (
		<>
			<div className="navbar">
				<NavBar route={route} setRoute={setRoute} />
			</div>
			<div className="container">
				{route === "Home" && <Home setRoute={setRoute} />}
				{route === "ProductListing" && <ProductListing setRoute={setRoute} />}
				{route === "WishList" && <WishList setRoute={setRoute} />}
				{route === "Cart" && <Cart />}
			</div>
		</>
	);
}
