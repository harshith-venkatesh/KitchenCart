import { createContext, useContext, useReducer } from "react";
import { dataReducer, initialData } from "../reducers/dataReducer";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [{ cartListItems, wishListItems }, dispatch] = useReducer(
		dataReducer,
		initialData
	);

	return (
		<DataContext.Provider
			value={{ cartListItems, wishListItems, dataDispatch: dispatch }}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
