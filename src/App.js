import Header from './components/Layout/Header';
import React, {useState} from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart'
import CartManager from './store/CartManager'

function App() {
  const [isCartActive,setIsCartActive] = useState(false);

  const openCartHandler = ()=>{
    setIsCartActive(true);
  }

  const closeCartHandler = ()=>{
    setIsCartActive(false);
  }

  return (<CartManager>
    {isCartActive && <Cart onCloseCart={closeCartHandler} />}
    <Header onClickCart={openCartHandler} />
    <main>
      <Meals />
    </main>
  </CartManager>);
}

export default App;
