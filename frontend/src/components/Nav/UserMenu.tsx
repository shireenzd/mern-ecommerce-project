import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useCommerceStore } from "../../store"

function UserMenu({ setShowUserMenu }: { setShowUserMenu: Function }) {

  const navigate = useNavigate()
  const {
    setToken
  } = useCommerceStore()

  const links = {
    "Home": '/home',
    "Sell": '/sell',
    "MyOrders": '/my-orders',
  }

  const handleLogout = () => {
    setToken('')
    setShowUserMenu(false);
    // navigate('/auth/login')
  }
  return (
    <div className="absolute right-6 top-16 flex flex-col gap-2 z-20">
      <Link to='/auth/login' onClick={handleLogout} className="bg-black text-white p-2">
        Logout
      </Link>
      {Object.entries(links).map(([key, value], i) => {
        return (<Link onClick={() => setShowUserMenu(false)} className="bg-black text-white p-2" to={value}>
          {key}
        </Link>)
      })}
    </div>
  )
}

export default UserMenu