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

    const createStore={
        backgroundImage: 'url(/addProduct.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'90vh'
    }
 

    return (
        <div className="flex justify-center my-4 items-center gap-6" style={createStore}>
            <div className="">
                <CreateStoreForm inputs={inputs} setInputs={setInputs} />
            </div>
            <div className=" flex justify-center items-center rounded-xl box">
                <StoreCardPreview inputs={inputs}/>
            </div>
        </div>

    )
}

export default CreateStorePage