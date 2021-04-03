import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { DataProvider } from "./context/dataContext";
import { ProductProvider } from "./context/productContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<ProductProvider>
			<DataProvider>
				<App />
			</DataProvider>
		</ProductProvider>
	</StrictMode>,
	rootElement
);
