import { createContext, useContext, useReducer } from "react";
import {
	INCLUDE_OUT_OF_STOCK,
	ONLY_FAST_DELIVERY,
	productReducer
} from "../reducers/productReducer";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(productReducer, {
		products: productData,
		[INCLUDE_OUT_OF_STOCK]: false,
		[ONLY_FAST_DELIVERY]: false,
		priceRange: 1000
	});

	return (
		<ProductContext.Provider
			value={{ productsState: state, productsDispatch: dispatch }}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProducts = () => useContext(ProductContext);
