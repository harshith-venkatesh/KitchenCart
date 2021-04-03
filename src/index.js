import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { DataProvider } from "./context/dataContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
	<StrictMode>
		<DataProvider>
			<App />
		</DataProvider>
	</StrictMode>,
	rootElement
);
