import { useState } from 'react'
import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals/Meals'
import Cart from './Components/Cart/Cart'
import CartProvider from './Store/CartProvider'

function App() {
  const [cartIsShown,setCartIsShown] =useState(false);

  const cartShownHandler = () =>{
    setCartIsShown(true);
  }
  const cartHideHandler = () =>{
    setCartIsShown(false);
  }

  return (
    <CartProvider>
    {cartIsShown && <Cart onClose={cartHideHandler} />}
     <Header onShowCart = {cartShownHandler}/>   
     <main>
      <Meals />
     </main>
     </CartProvider>
  )
}

export default App
