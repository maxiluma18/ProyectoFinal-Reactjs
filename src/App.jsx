
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import  { BrowserRouter, Routes, Route } from 'react-router-dom';
import {CartProvider} from "./context/CartContext";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer greeting="Bienvenidos a Subaaton"/>}/>
            <Route path="/categoria/:categoriaId" element={<ItemListContainer greeting="Productos de la categoria elegida"/>} />
            <Route path='/item/:itemId'  element={<ItemDetailContainer />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/Checkout" element={<Checkout />}/>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
