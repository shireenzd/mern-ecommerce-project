import React, { useEffect, useState } from 'react'
import CreateStoreForm from "../components/Forms/CreateStoreForm"
import { useNavigate } from "react-router-dom"
import { useCommerceStore } from "../store"
import StoreCardPreview from "../components/Store/StoreCardPreview"

function CreateStorePage() {
    const navigate = useNavigate()

    const { token } = useCommerceStore()
    
    const [inputs, setInputs] = useState<any>({
        name: '',
        description: '',
        location: '',
        logo: null
    })

    useEffect(() => {
        if (!token) {
            return navigate('/auth/login')
        }
    }, [])
    return (
        <div className="flex">
            <div className="w-1/2">
                <CreateStoreForm inputs={inputs} setInputs={setInputs} />
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <StoreCardPreview inputs={inputs}/>
            </div>
        </div>

    )
}

export default CreateStorePage