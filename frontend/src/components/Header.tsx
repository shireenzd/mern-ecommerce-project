import React from 'react'
import Nav from "./Nav/Nav"

function Header() {


  return (
    // logo
    // nav+user menu
    <div className="header flex justify-between items-center px-6 py-4">
      <img width={80} src="/logo.png" alt="Ecommerce store logo" />
      <Nav />
    </div>
  )
}

export default Header