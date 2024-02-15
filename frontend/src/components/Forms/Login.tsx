import axios from "axios"
import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { blackButtonStyle, formInputRowStyle, homeAPI } from "../../shared/constants"
import { Link, useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()
  const {
    setToken,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    setUserConfirmPassword
  } = useCommerceStore()

  const [error, setError] = useState('');

  const handleSubmit = (e: any) => {
    const userData = {
      email: userEmail,
      password: userPassword
    }
    // localhost:5000/api/v1/users/register
    axios.post(homeAPI + '/users/login', userData)
      .then(function (response) {
        if (response.status === 200) {
          setUserPassword('')
          setUserConfirmPassword('')
          setToken(response.data.token)
          navigate(-1)
        } else {
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <>

      <form className="flex flex-col gap-4 px-4">
        <h1 className="text-start text-xl">
          <b>
            Login
          </b>
        </h1>
        <span className='input-box'>
          <input type="text" name="login-user-email" required id="login-user-email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
          <label htmlFor="login-user-email" >Email</label>
        </span>

        <span className='input-box'>
          <input type="password" required name="login-user-pass" id="login-user-pass" value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} />
          <label htmlFor="login-user-pass">Password</label>
        </span>
        <span>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </span>
        <div className="flex justify-end">
          <button className={blackButtonStyle} onClick={handleSubmit} type="button">Login</button>
        </div>
      </form>
      <p  className="text-center mt-6">Don't have an account?
        <Link className="text-[var(--accent-color)]" to="/auth/register"> Click Here</Link>
      </p>
    </>
  )
}

export default Login