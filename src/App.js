import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import GeneralContext from "./contexts/GeneralContext";
import { Homepage, Navbar, AllProducts, SingleProduct, ShoppingCart, NoPage, AddProducts, Dashboard, AdminNav } from "./components/index";
import ThankYou from "./components/ShoppingCart/ThankYou";

function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productSpecs, setProductSpecs] = useState({
    categories: [],
    colors: []
  });

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({ name: "", password: "" });

  useEffect(() => {
    axios.get('http://localhost:5001/api/products')
      .then((res) => {
        setProducts(prev => res.data.products);
        // console.log(res.data.products);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5001/specifications')
      .then((res) => {
        const categories = res.data.categories;
        const colors = res.data.colors;
        setProductSpecs({ categories, colors });
        // console.log(colors)
        // console.log("now", res)
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const register = () => {
    axios.post('http://localhost:5001/users', { username: registerUsername, password: registerPassword })
      .then((res) => {
        console.log(res);
        toast("New User Registered", { position: "top-right", type: 'success', autoClose: 1500, theme: 'dark' });

        // This will empty input fields
        let elements = document.getElementsByTagName("input");
        for (let i = 0; i < elements.length; i++) {
          elements[i].value = "";
        }
      });
  };

  const login = () => {
    axios.post('http://localhost:5001/users/login', { username: username, password: password })
      .then((res) => {
        console.log(res.data.rows[0]);
        const loggedUser = res.data.rows[0];
        if (res.data.rows.length === 0) {
          toast("Invalid Credentials!", { position: "top-right", type: 'success', autoClose: 1500, theme: 'dark' });
        } else {
          setUser(loggedUser);
          navigate("./dashboard/addproducts");
        }
      });
  };

  // console.log('user', user)
  return (
    <div>
      <GeneralContext.Provider value={{ products, productSpecs, cart, setCart }} >
        {user.name ? <AdminNav user={user} setUser={setUser} /> : <Navbar />}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:id" element={<AllProducts />} />
          <Route path="/products/keyboards/:id" element={<SingleProduct />} />
          <Route path="/products/mice/:id" element={<SingleProduct />} />
          <Route path="/products/headsets/:id" element={<SingleProduct />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/dashboard" element={
            <Dashboard
              login={login}
              register={register}
              setRegisterUsername={setRegisterUsername}
              setRegisterPassword={setRegisterPassword}
              setUsername={setUsername}
              setPassword={setPassword}
            />} />
          {user.name ?
            <Route path="/dashboard/addproducts"
              element={<AddProducts />} />
            :
            <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
