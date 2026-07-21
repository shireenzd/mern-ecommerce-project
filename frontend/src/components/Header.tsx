import React from 'react'
import { Link } from 'react-router-dom'
import Nav from "./Nav/Nav"
import { APP_NAME } from "../shared/constants"

function Header() {
  return (
    <div className="header flex justify-between items-center px-6 py-4">
      <Link to="/home" className="flex items-center gap-3 no-underline text-inherit">
        <span className="text-xl font-semibold tracking-tight text-gray-900">{APP_NAME}</span>
      </Link>
      <Nav />
    </div>
  )
}

export default Header
