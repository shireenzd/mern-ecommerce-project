import React, { useEffect, useState } from 'react';
import './App.css';
import { useCommerceStore } from "./store";
import ReviewModal from "./components/Modals/ReviewModal";
import ProductList from "./components/Products/ProductList";
import Header from "./components/Header";
import FiltersBar from "./components/Filters/FiltersBar";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MyOrders from "./pages/MyOrders";
import CartModal from "./components/Cart/CartModal";
import SellPage from "./pages/SellPage";
import MyProducts from "./pages/MyProducts";
import ConfirmModal from "./components/Modals/ConfirmModal";


function App() {
  const {
    token,
    showCart,
    setShowCart,
    showConfimModal,
    confirmModalMessage,
    onCancel,
    onConfirm,
    showReviewModal
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
    <div className="App flex flex-col h-screen">
      {showCart && <CartModal />}
      {/* @ts-ignore */}
      {showConfimModal && <ConfirmModal message={confirmModalMessage} onCancel={onCancel} onConfirm={onConfirm} />}

      {showReviewModal && <ReviewModal />}
      <div className="flex flex-col w-full bg-white">
        <Header />
        {showFilters && <FiltersBar />}
      </div>
      <div className="overflow-y-scroll w-full">
        <Routes>
          <Route path="/home" element={<ProductList />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/*" element={<ProductList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
