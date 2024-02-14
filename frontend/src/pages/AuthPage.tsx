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


  const backgroundStyle = {
    backgroundImage: `url('/background image.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const formStyles = {
   // backgroundColor: '#e8cbad',
    backgroundColor: '#ecd8c3',
    opacity: '70%',
    boxShadow:' 4px 4px 4px 4px rgba(0, 0, 0, 0.7)',
  }
  
  return (
    <div style={backgroundStyle} className="h-screen flex items-center flex-wrap justify-start">
      <div style={formStyles} className=" flex flex-col justify-center auth min-h-96 w-1/2 ml-20  ">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default AuthPage