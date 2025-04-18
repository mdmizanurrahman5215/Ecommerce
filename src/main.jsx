
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { AppProvider } from './context/ProductContext';
import { FilterContextProvider } from './context/FilterContext';
import { CartProvider } from './context/CartContext';


createRoot(document.getElementById('root')).render(
  <AppProvider>
    <FilterContextProvider>
      <CartProvider>
      <App/>
      </CartProvider>
   
    </FilterContextProvider>
  </AppProvider>

 
)
