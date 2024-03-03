import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from "./components/Login";
import Account from "./components/Account";
import NavBar from "./components/Navbar";

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
          <Route path="/auth/login" element={<Login setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
