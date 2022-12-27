import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';

import GeneralContext from "./contexts/GeneralContext";
import { Homepage, Navbar, AllProducts, SingleProduct, ShoppingCart, NoPage, AddProducts, Dashboard, AdminNav, EditProducts } from "./components/index";
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

  const [newSku, setNewSku] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [display, setDisplay] = useState(false);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");


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

    if (registerUsername === "" || registerPassword === "") {
      // console.log("can't be empty")
      toast("Fields Can Not Be Empty!", { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
    } else {
      axios.post('http://localhost:5001/users', { username: registerUsername, password: registerPassword })
        .then((res) => {
          if (res.data.errCode) {
            // console.log("username already taken");
            toast(`${res.data.errMsg}`, { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
          } else if (res.data.newUser) {
            // console.log("user added successfully");
            toast("User Added Successfully!", { position: "top-right", type: 'success', autoClose: 1500, theme: 'dark' });
          }
          // console.log(res);

          // This will empty input fields
          let elements = document.getElementsByTagName("input");
          for (let i = 0; i < elements.length; i++) {
            elements[i].value = "";
          }
        });
    }
  };

  const login = () => {
    axios.post('http://localhost:5001/users/login', { username: username, password: password })
      .then((res) => {
        console.log(res.data.rows[0]);
        const loggedUser = res.data.rows[0];
        if (res.data.rows.length === 0) {
          toast("Invalid Credentials!", { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
        } else {
          setUser(loggedUser);
          navigate("./dashboard/addproducts");
        }
      });
  };

  const addProduct = () => {
    if (newSku === "" ||
      category === "" ||
      color === "" ||
      newName === "" ||
      newDescription === "" ||
      url1 === "" ||
      image1 === "" ||
      image2 === "" ||
      image3 === "" ||
      url2 === "" ||
      url3 === "" ||
      newPrice === ""
    ) {
      toast("Please Fill All Fields!", { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
      // console.log('Not ');
    } else {
      axios.post("http://localhost:5001/api/products", {
        sku: newSku, name: newName, price: newPrice,
        description: newDescription,
        image1: url1, image2: url2, image3: url3,
        color: color, category: category, display: display
      })
        .then(res => {
          if (res.data.errCode) {
            // console.log('already exists');
            toast("SKU already exists!", { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
          } else if (res.data.newProduct) {
            // console.log('Successfully added');
            toast("Item Successfully added!", { position: "top-right", type: 'success', autoClose: 1500, theme: 'dark' });
            console.log("sku", newSku);

            let inputs = document.getElementsByTagName("input");
            for (let i = 0; i < inputs.length; i++) {
              inputs[i].value = "";
            }
            let textArea = document.getElementsByTagName("textarea");
            for (let i = 0; i < textArea.length; i++) {
              textArea[i].value = "";
            }
            setColor("");
            setCategory("");
            setDisplay(false);
            setUrl1("");
            setUrl2("");
            setUrl3("");
          }
        });
    }
  };

  const editProduct = (updateProduct) => {
    // console.log('update', updateProduct)

    if (updateProduct.name === "" || updateProduct.description === "" || updateProduct.price === "") {
      toast("Please Fill All Fields!", { position: "top-right", type: 'error', autoClose: 1500, theme: 'dark' });
    } else {

      axios.put(`http://localhost:5001/api/products/${updateProduct.id}`, { product: updateProduct })
        .then(res => {
          // if (res.data.errCode === 1002) {
          //   console.log('error');
          // } else {
          const updatedProduct = res.data;
          console.log(updatedProduct);
          const updatedProducts = products.map(product => {
            if (product.id === updatedProduct.id) {
              return updatedProduct;
            }
            console.log(product);
            return product;
          });
          setProducts([...updatedProducts]);
          console.log(`product edited`);
          toast(`Product With SKU${updateProduct.sku} Successfully Edited!`, { position: "top-right", type: 'success', autoClose: 1500, theme: 'dark' });
          // }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
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
              element={<AddProducts
                addProduct={addProduct}
                setNewSku={setNewSku}
                setNewName={setNewName}
                setNewPrice={setNewPrice}
                setNewDescription={setNewDescription}
                setImage1={setImage1}
                setImage2={setImage2}
                setImage3={setImage3}
                setColor={setColor}
                setCategory={setCategory}
                setDisplay={setDisplay}
                display={display}
                category={category}
                color={color}
                image1={image1}
                image2={image2}
                image3={image3}
                url1={url1}
                setUrl1={setUrl1}
                url2={url2}
                setUrl2={setUrl2}
                url3={url3}
                setUrl3={setUrl3}
              />} />
            :
            <Route path="/dashboard" element={<Dashboard />} />}
          {user.name ? <Route path="/dashboard/editproducts"
            element={<EditProducts editProduct={editProduct} />} />
            :
            <Route path="/dashboard" element={<Dashboard />} />}
        </Routes>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
