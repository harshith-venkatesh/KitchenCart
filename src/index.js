import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { DataProvider } from './context/dataContext'
import { ProductProvider } from './context/productContext'
import { makeServer } from './server/mockServer'
makeServer()
const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <Router>
      <ProductProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ProductProvider>
    </Router>
  </StrictMode>,
  rootElement
)
