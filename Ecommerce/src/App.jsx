import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from "./components/Login";
import Account from "./components/Account";
import NavBar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Carts from './components/Cart';

function App() {
  const [token, setToken] = useState(null);

  console.log("token", token);
  return (
    <div>
      <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setToken={setToken}/>} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/products" element={<ProductList token={token}/> }/>
          <Route path="/products" element={<AddProduct token={token}/> }/>
          <Route path="/products/:id" element={<ProductDetails token={token}/> }/>
          <Route path="/carts" element={<Carts token={token}/> }/>                  
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
