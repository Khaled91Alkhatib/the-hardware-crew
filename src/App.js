import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GeneralContext from "./contexts/GeneralContext";
import { Homepage, Navbar, AllProducts, SingleProduct } from "./components/index";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then((res) => {
        setProducts(prev => res.data.products);
        // console.log(res.data.products);
      });
  }, []);

  return (
    <div>
      <GeneralContext.Provider value={{ products }} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products/:id" element={<AllProducts />} />
            <Route path="/products/keyboards/:id" element={<SingleProduct />} />
            <Route path="/products/mice/:id" element={<SingleProduct />} />
            <Route path="/products/headsets/:id" element={<SingleProduct />} />
          </Routes>
        </BrowserRouter>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
