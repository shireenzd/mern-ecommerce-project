import React from 'react'

function Header() {
  
  // TODO extract from token if it exists in global state
  const name = 'Name'
  // TODO
  return (
    // logo
    // nav+user menu
    <div className="header flex justify-between items-center px-6 py-4">
        <img width={80} src="/logo.png" alt="Ecommerce store logo" />
      <div className="nav flex gap-4 items-center min-h-10">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact Us</a>
        <div className="flex items-center gap-4">
          {name}
          <div className="rounded-full bg-red-100 p-2">
          <img width={20} src="/profile.png" alt="User Menu" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header