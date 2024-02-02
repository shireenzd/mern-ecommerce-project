import React, { useEffect, useState } from 'react';
import './App.css';
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import { useCommerceStore } from "./store";
import Review from "./components/Forms/Review";
import AddProduct from "./components/Forms/AddProduct";
import CreateStore from "./components/Forms/CreateStore";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import FiltersBar from "./components/Filters/FiltersBar";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreateStorePage from "./pages/CreateStorePage";
import MyOrders from "./pages/MyOrders";
import CartModal from "./components/Cart/CartModal";

function App() {
  const {
    token,
    showCart,
    setShowCart
  } = useCommerceStore()
  const location = useLocation()
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const pathsToShowFilters = [
      '/home'
    ]
    if (pathsToShowFilters.includes(location.pathname)) {
      setShowFilters(true)
    } else {
      setShowFilters(false)
    }
  }, [location])

  return (
    <div className="App">
      {showCart && <CartModal />}
      {/* {!token &&
        <>
          <Register />
          <br />
          <Login />
        </>
      } */}
      <Header />
      {showFilters && <FiltersBar />}
      {/* <Review />
      
      <AddProduct/>
      
      <CreateStore/> */}
      <Routes>
        <Route path="/home" element={<ProductList />} />
        <Route path="/sell" element={<CreateStorePage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/*" element={<ProductList />} />
      </Routes>

    </div>
  );
}

export default App;
