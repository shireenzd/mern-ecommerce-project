import React, { useEffect } from 'react'
import CreateStore from "../components/Forms/CreateStore"
import { useNavigate } from "react-router-dom"
import { useCommerceStore } from "../store"

function CreateStorePage() {
    const navigate = useNavigate()
    
    const {token}=useCommerceStore()
    
    useEffect(()=>{
        if(!token){
            return navigate('/auth/login')
        }
    },[])
    return (
        <CreateStore />
    )
}

export default CreateStorePage