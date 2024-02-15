import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { greenButtonStyle, homeAPI } from "../../shared/constants"

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
        setToken,
        setStoreName
    } = useCommerceStore()


    const handleCreateStore = (e: any) => {
        const formData = new FormData()
        formData.append('name', inputs.name)
        formData.append('description', inputs.description)
        formData.append('location', inputs.location)
        formData.append('logo', inputs.logo)

        setStoreName(inputs.name)

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
        justifyContent: 'space-between',
        backgroundColor: '#e5e5e5',
        opacity:'70%',
        padding: '20px',
        boxShadow: ' 4px 4px 4px 4px rgba(0, 0, 0, 0.3)',

    }
    const inputRowStyle = "flex flex-col items-start"


    return (
        <form className="flex flex-col justify-center gap-2 rounded-xl "  style={formStyle}>
            <span>
                <label htmlFor="store-name" className='flex justify-start'>Store Name</label>
                <input type="text" name="store-name" id="store-name" value={inputs.name} onChange={(e) => { setInputs({ ...inputs, name: e.target.value }) }} />
            </span>

            <span>
                <label htmlFor="store-description" className='flex justify-start'>Store Description</label>
                <textarea name="store-description" id="store-description" cols={30} rows={3} value={inputs.description} onChange={(e) => { setInputs({ ...inputs, description: e.target.value }) }}></textarea>
            </span>

            <span>
                <label htmlFor="store-location" className='flex justify-start'>Store Location</label>
                <input type="text" name="store-location" id="store-location" value={inputs.location} onChange={(e) => { setInputs({ ...inputs, location: e.target.value }) }} />
            </span>

            <span>
                <label htmlFor="store-logo" className='flex justify-start'>Store Logo</label>
                {/* @ts-ignore */}
                <input onChange={(e) => setInputs({ ...inputs, logo: e.target.files[0] })} type="file" name="store-logo" id="store-logo" />
            </span>
            <span className={inputRowStyle}>
            <button onClick={handleCreateStore} className={greenButtonStyle} type="button">Create Store</button>
            </span>
        </form>
    )
}

export default CreateStore