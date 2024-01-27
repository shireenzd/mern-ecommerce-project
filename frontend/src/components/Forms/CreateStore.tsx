import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { homeURL } from "../../shared/constants"

function CreateStore() {

    const {
        token
    } = useCommerceStore()

    const [inputs, setInputs] = useState({
        name: '',
        description: '',
        location: ''
    })

    const handleCreateStore = (e: any) => {
        // localhost:5000/api/v1/stores/create
        fetch(homeURL+'/stores/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(inputs)
        })
        .then((response)=>response.json())
        .then((response)=>{
            console.log(response)
        })
    }

    
  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between'
  }
    return (
        <form action="" style={formStyle}>
            <span>
                <label htmlFor="store-name">Store Name</label>
                <input type="text" name="store-name" id="store-name" value={inputs.name} onChange={(e) => { setInputs({ ...inputs, name: e.target.value }) }} />
            </span>

            <span>
                <label htmlFor="store-description">Store Description</label>
                <textarea name="store-description" id="store-description" cols={30} rows={10} value={inputs.description} onChange={(e) => { setInputs({ ...inputs, description: e.target.value }) }}></textarea>
            </span>

            <span>
                <label htmlFor="store-location">Store Location</label>
                <input type="text" name="store-location" id="store-location" value={inputs.location} onChange={(e) => { setInputs({ ...inputs, location: e.target.value }) }} />
            </span>

            <button onClick={handleCreateStore} type="button">Create Store</button>

        </form>
    )
}

export default CreateStore