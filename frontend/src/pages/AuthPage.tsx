import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import Register from "../components/Forms/Register"
import Login from "../components/Forms/Login"
import { useCommerceStore } from "../store"

function AuthPage() {
  const navigate = useNavigate()

  const { token } = useCommerceStore()

  useEffect(() => {
    if (token) {
      return navigate('/home')
    }
  }, [])
  
  return (
    <div className="flex items-center flex-wrap justify-center">
      <div className="auth w-1/2 min-w-[400px]">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className="graphic w-1/2 p-4 min-w-[400px]">
        <img src="/landing.webp" alt="" />
      </div>
    </div>
  )
}

export default AuthPage