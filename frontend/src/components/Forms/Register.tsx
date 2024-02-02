import React, { useState } from 'react'
import axios from "axios"
import { useCommerceStore } from "../../store"
import { blackButtonStyle, formInputRowStyle, homeURL } from "../../shared/constants"
import { Link } from "react-router-dom"

function Register() {

    const { setToken } = useCommerceStore()

    const {
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
        userConfirmPassword,
        setUserConfirmPassword,
    } = useCommerceStore()

    const handleSubmit = (e: any) => {
        if(userPassword !== userConfirmPassword){
            // TODO show errors under inputs
            return alert('Non matching passwords')
        }
        const userData = {
            name:userName,
            email:userEmail,
            password:userPassword
        }
        // localhost:5000/api/v1/users/register
        axios.post(homeURL + '/users/register', userData)
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
        <>
            <form className="flex flex-col gap-4 px-6">
                <h1 className="text-start text-xl">
                    <b>
                        Register
                    </b>
                </h1>
                <span className={formInputRowStyle}>
                    <label htmlFor="user-name">User Name</label>
                    <input type="text" name="user-name" id="user-name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                </span>

                <span className={formInputRowStyle}>
                    <label htmlFor="register-user-email">Email</label>
                    <input type="text" name="register-user-email" id="register-user-email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
                </span>

                <span className={formInputRowStyle}>
                    <label htmlFor="register-user-pass">Password</label>
                    <input type="password" name="register-user-pass" id="register-user-pass" value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} />
                </span>

                <span className={formInputRowStyle}>
                    <label htmlFor="confirm-register-user-pass">Confirm Password</label>
                    <input type="password" name="confirm-register-user-pass" id="confirm-register-user-pass" value={userConfirmPassword} onChange={(e) => { setUserConfirmPassword(e.target.value) }} />
                </span>

                <div className="flex justify-end">
                    <button className={blackButtonStyle} onClick={handleSubmit} type="button">Register</button>
                </div>
            </form>
            <p>
                If you already have an account,
                <Link className="text-[var(--accent-color)]" to="/auth/login"> Click Here</Link>
            </p>
        </>
    )
}

export default Register