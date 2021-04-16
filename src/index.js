import { StrictMode } from "react"
import ReactDOM from "react-dom"

import App from "./App"
import { DataProvider } from "./context/dataContext"
import { ProductProvider } from "./context/productContext"
import { makeServer } from "./server/mockServer"
if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}
const rootElement = document.getElementById("root")
ReactDOM.render(
  <StrictMode>
    <ProductProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ProductProvider>
  </StrictMode>,
  rootElement
)
