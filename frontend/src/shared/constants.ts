export const APP_NAME = 'The Online Store'

export const homeURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const homeAPI = `${homeURL}/api/v1`;

export const productCategories = [
    'clothes',
    'furniture',
    'arts',
    'vases',
    'paintings',
] as const

export type ProductCategory = typeof productCategories[number]

export const blackButtonStyle = "bg-black text-white p-1 px-2 rounded-md"
export const greenButtonStyle = "bg-green-300 text-black p-1 px-2 rounded-md"
export const grayButtonStyle = "bg-gray-300 text-black p-1 px-2 rounded-md"
export const redButtonStyle = "bg-red-300 text-white p-1 px-2 rounded-md"

export const formInputRowStyle = "flex justify-between gap-8"


export const defaultProduct = {
    name: '',
    price: 99,
    description: '',
    category: '' as ProductCategory | '',
    pictures: [] as File[]
}
