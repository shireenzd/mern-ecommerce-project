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

      <form className="flex flex-col gap-4 px-6">
        <h1 className="text-start text-xl">
          <b>
            Login
          </b>
        </h1>
        <span className={formInputRowStyle}>
          <label htmlFor="login-user-email" className='w-52 text-start' >Email</label>
          <input type="text" name="login-user-email" required id="login-user-email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
        </span>

        <span className={formInputRowStyle}>
          <label htmlFor="login-user-pass" className='w-52 text-start'>Password</label>
          <input type="password" required name="login-user-pass" id="login-user-pass" value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} />
        </span>
        <span>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </span>
        <div className="flex justify-end">
          <button className={blackButtonStyle} onClick={handleSubmit} type="button">Login</button>
        </div>
      </form>
      <p>
         New to ECOM ?
        <Link className="text-[var(--accent-color)]" to="/auth/register"> Click Here</Link>
        &nbsp; to Register.
      </p>
    </>
  )
}

export default Login