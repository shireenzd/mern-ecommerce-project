import React, { useState } from 'react'
import { useCommerceStore } from "../../store"
import { blackButtonStyle, homeAPI } from "../../shared/constants"

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

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCreateStore = async () => {
        setError('')
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append('name', inputs.name)
            formData.append('description', inputs.description)
            formData.append('location', inputs.location)
            formData.append('logo', inputs.logo)

            const response = await fetch(homeAPI + '/stores/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })

            const data = await response.json()

            if (!response.ok || data?.error) {
                setError(data?.error || 'Failed to create store')
                return
            }

            if (data.token) {
                setToken(data.token)
            }
        } catch {
            setError('Failed to create store')
        } finally {
            setLoading(false)
        }
    }


    const formStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    }
    const inputRowStyle = "flex flex-col items-start w-full gap-1"
    return (
        <form className="flex flex-col gap-4 px-6" action="" style={formStyle}>
            <h1 className="text-start text-xl font-bold">Create Store</h1>
            <span className={inputRowStyle}>
                <label htmlFor="store-name">Store Name</label>
                <input type="text" name="store-name" id="store-name" value={inputs.name} onChange={(e) => { setInputs({ ...inputs, name: e.target.value }) }} />
            </span>

            <span className={inputRowStyle}>
                <label htmlFor="store-description">Store Description</label>
                <textarea name="store-description" id="store-description" cols={30} rows={10} value={inputs.description} onChange={(e) => { setInputs({ ...inputs, description: e.target.value }) }}></textarea>
            </span>

            <span className={inputRowStyle}>
                <label htmlFor="store-location">Store Location</label>
                <input type="text" name="store-location" id="store-location" value={inputs.location} onChange={(e) => { setInputs({ ...inputs, location: e.target.value }) }} />
            </span>

            <span className={inputRowStyle}>
                <label htmlFor="store-logo">Store Logo</label>
                {/* @ts-ignore */}
                <input onChange={(e) => setInputs({ ...inputs, logo: e.target.files[0] })} type="file" name="store-logo" id="store-logo" />
            </span>

            <div className="flex flex-col items-end gap-2">
                {error && <p className="w-full text-left text-xs text-red-600">{error}</p>}
                <button
                    className={`${blackButtonStyle} px-4 py-2 text-sm font-semibold transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60`}
                    onClick={handleCreateStore}
                    type="button"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Store'}
                </button>
            </div>

        </form>
    )
}

export default CreateStore