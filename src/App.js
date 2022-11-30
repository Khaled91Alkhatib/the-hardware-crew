import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GeneralContext from "./contexts/GeneralContext";
import { Homepage, Navbar, AllProducts, SingleProduct, ShoppingCart, NoPage, AddProducts } from "./components/index";
import ThankYou from "./components/ShoppingCart/ThankYou";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then((res) => {
        setProducts(prev => res.data.products);
        // console.log(res.data.products);
      });
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart-info'));
    if (cart) {
      setCart(cart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart-info', JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <GeneralContext.Provider value={{ products, cart, setCart }} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products/:id" element={<AllProducts />} />
            <Route path="/products/keyboards/:id" element={<SingleProduct />} />
            <Route path="/products/mice/:id" element={<SingleProduct />} />
            <Route path="/products/headsets/:id" element={<SingleProduct />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/*" element={<NoPage />} />
            <Route path="/addproducts" element={<AddProducts />} />
          </Routes>
        </BrowserRouter>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
