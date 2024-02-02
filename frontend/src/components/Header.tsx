import React from 'react'
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCommerceStore } from "../store";

function Header() {
  const {
    setShowCart
  } = useCommerceStore()
  
  // TODO extract from token if it exists in global state
  const name = 'Name'
  // TODO
  return (
    // logo
    // nav+user menu
    <div className="header flex justify-between items-center px-6 py-4">
        <img width={80} src="/logo.png" alt="Ecommerce store logo" />
      <div className="nav flex gap-4 items-center min-h-10">
        <Link to="/home">Home</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/my-orders">My Orders</Link>
        <CiShoppingCart onClick={()=>setShowCart(true)} size={25} className="m-0 p-0 cursor-pointer"/>
        <div className="flex items-center gap-4">
          {name}
          <div className="rounded-full bg-[var(--accent-color)] p-2">
          <img width={20} src="/profile.png" alt="User Menu" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header