import React, { useEffect, useState } from 'react';
import './App.css';
import { useCommerceStore } from "./store";
import ReviewModal from "./components/Modals/ReviewModal";
import ProductList from "./components/Products/ProductList";
import Header from "./components/Header";
import FiltersBar from "./components/Filters/FiltersBar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MyOrders from "./pages/MyOrders";
import CartModal from "./components/Cart/CartModal";
import CartToast from "./components/Cart/CartToast";
import SellPage from "./pages/SellPage";
import MyProducts from "./pages/MyProducts";
import ConfirmModal from "./components/Modals/ConfirmModal";

function App() {
  const {
    showCart,
    showConfimModal,
    confirmModalMessage,
    onCancel,
    onConfirm,
    showReviewModal
  } = useCommerceStore()
  const location = useLocation()
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const pathsToShowFilters = ['/home', '/']
    setShowFilters(pathsToShowFilters.includes(location.pathname))
  }, [location])

  return (
    <div className="App flex flex-col h-screen">
      {showCart && <CartModal />}
      <CartToast />
      {/* @ts-ignore */}
      {showConfimModal && <ConfirmModal message={confirmModalMessage} onCancel={onCancel} onConfirm={onConfirm} />}

      {showReviewModal && <ReviewModal />}
      <div className="flex flex-col w-full border-b border-gray-100 bg-white">
        <Header />
        {showFilters && <FiltersBar />}
      </div>
      <div className="w-full flex-1 overflow-y-auto bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<ProductList />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
