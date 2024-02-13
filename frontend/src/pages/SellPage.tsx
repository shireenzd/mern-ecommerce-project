import React, { useEffect, useState } from 'react'
import { useCommerceStore } from "../store"
import CreateStorePage from "./CreateStorePage";
import AddProductsPage from "./AddProductsPage";
import { parseJwt } from "../shared/utils";

function SellPage() {
    const { token } = useCommerceStore()



    const [decodedToken, setDecodedToken] = useState<any>({})

    useEffect(() => {
        console.log(token)
        if (token) {
            setDecodedToken(parseJwt(token))
        }

    }, [token])

    return (
        decodedToken?.user?.store ? (<AddProductsPage />) : (<CreateStorePage />)
    )
}

export default SellPage