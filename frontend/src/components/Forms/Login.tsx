import axios from "axios"
import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { homeURL } from "../../shared/constants"

function Login() {
  const {
    setToken
  } = useCommerceStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between'
  }


  const handleSubmit = (e: any) => {
    const userData = {
        email,
        password
    }
    // localhost:5000/api/v1/users/register
    axios.post(homeURL+'/users/login', userData)
        .then(function (response) {
            console.log(response);
            // const result = await response.json()
            setToken(response.data.token)
        })
        .catch(function (error) {
            console.log(error);
        });

}
  return (
    <form style={formStyle}>
      <span>
        <label htmlFor="login-user-email">login-user-email</label>
        <input type="text" name="login-user-email" id="login-user-email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
      </span>

      <span>
        <label htmlFor="login-user-pass">login-user-pass</label>
        <input type="password" name="login-user-pass" id="login-user-pass" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </span>

      <button onClick={handleSubmit} type="button">Login</button>
    </form>
  )
}

export default Login