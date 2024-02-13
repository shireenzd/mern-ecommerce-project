import React, { useEffect, useState } from 'react'
import { CiShoppingCart } from "react-icons/ci"
import { Link } from "react-router-dom"
import { useCommerceStore } from "../../store"
import UserMenu from "./UserMenu"
import { parseJwt } from "../../shared/utils"

function Nav() {
    
    const {
        token,
        setShowCart
    } = useCommerceStore()

    
    const [decodedToken, setDecodedToken] = useState<any>({})
    const [showUserMenu, setShowUserMenu] = useState(false)
    
    useEffect(() => {
        console.log(token)
        if (token) {
            setDecodedToken(parseJwt(token))
        }

    }, [token])



    return (
        <>
            {showUserMenu && <UserMenu setShowUserMenu={setShowUserMenu} />}
            <div className="nav relative flex gap-4 items-center min-h-10">
                <Link to="/home">Home</Link>
                <Link to="/sell">Sell</Link>
                {decodedToken?.user?.store && <Link to="/my-products">My Products</Link>}
                <Link to="/my-orders">My Orders</Link>
                <CiShoppingCart onClick={() => setShowCart(true)} size={25} className="m-0 p-0 cursor-pointer" />
                <div className="flex items-center gap-4">
                    {decodedToken?.user?.name}
                    <div onClick={()=>setShowUserMenu(!showUserMenu)} className="cursor-pointer rounded-full bg-[var(--accent-color)] p-2">
                        <img width={20} src="/profile.png" alt="User Menu" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav