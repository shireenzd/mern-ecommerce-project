import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { homeAPI } from "../../shared/constants"

function CreateStore({ inputs, setInputs }: {
    inputs: {
        name: string,
        description: string,
        location: string,
        logo: any,
    }, setInputs: Function
}) {

    const {
        token,
        setToken
    } = useCommerceStore()


    const handleCreateStore = (e: any) => {
        const formData = new FormData()
        formData.append('name', inputs.name)
        formData.append('description', inputs.description)
        formData.append('location', inputs.location)
        formData.append('logo', inputs.logo)

        // localhost:5000/api/v1/stores/create
        fetch(homeAPI + '/stores/create', {
            method: 'POST',
            headers: {
                // fetch will automatically generate  the appropriate header for us based on the Content-Type of the body passed in.
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    setToken(response.data.token)
                }
            })
    }


    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }
    return (
        <form className="flex flex-col" action="" style={formStyle}>
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

            <span>
                <label htmlFor="store-logo">Store Logo</label>
                {/* @ts-ignore */}
                <input onChange={(e) => setInputs({ ...inputs, logo: e.target.files[0] })} type="file" name="store-logo" id="store-logo" />
            </span>

            <button onClick={handleCreateStore} type="button">Create Store</button>

        </form>
    )
}

export default CreateStore