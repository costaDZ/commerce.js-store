import React, { useState, useEffect } from "react";
import { commerce } from "./components/lib/Commerce";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav, Products, CartContent, Checkout } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProduct = async () => {
    setProducts(await commerce.products.list());
    setLoading(false);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    setLoading(false);
  };

  const addToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const updateCart = async (itemId, quantity) => {
    const { cart } = await commerce.cart.update(itemId, { quantity });
    setCart(cart);
  };

  const removeFromCart = async (itemId) => {
    const { cart } = await commerce.cart.remove(itemId);
    setCart(cart);
  };

  const clearCart = async (itemId) => {
    const { cart } = await commerce.cart.empty(itemId);
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      refreshCart();
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    try {
      fetchProduct();
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading ...</h1>
      </>
    );
  }

  return (
    <Router className="App">
      <Nav {...cart} />
      <Switch>
        <Route exact path="/">
          <Products products={products.data} addToCart={addToCart} />
        </Route>
        <Route path="/cart">
          <CartContent
            {...cart}
            updateCart={updateCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        </Route>
        <Route path="/checkout">
          <Checkout
            cart={cart}
            order={order}
            handleCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
