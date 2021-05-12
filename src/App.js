import React, { useState, useEffect } from "react";
import { commerce } from "./components/lib/Commerce";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Nav, Products, CartContent, Checkout, Footer } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [filterdProduct, setFilterdProduct] = useState([]);
  const [cartBorder, setCartBorder] = useState('primary');
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProduct = async () => {
    let { data } = await commerce.products.list();
    setProducts(data);
    setLoading(false);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
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

  const searchFilter = (target) => {
    let newItems = products.filter(item => item.name.toLowerCase().slice(0, target.length) === target.toLowerCase());
    setFilterdProduct(newItems);

    if (target && newItems.length) {
      setCartBorder("success");
    } else if (target && !newItems.length) {
      setCartBorder("danger");
    } else {
      setCartBorder("primary");
    }
  }



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
        <div
          className={
            "vh-100 d-flex justify-content-center align-items-center bg-light"
          }
        >
          <Spinner animation="border" variant="primary" />
        </div>
      </>
    );
  }

  return (
    <Router className="App">
      <Nav
        {...cart}
        searchFilter={searchFilter}
        cartBorder={cartBorder}
      />
      <Switch>
        <Route exact path="/">
          <Products
            loading={loading}

            products={filterdProduct.length ? filterdProduct : products}
            addToCart={addToCart}
            cartBorder={cartBorder}
          />
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
      <Footer />
    </Router>
  );
}

export default App;
