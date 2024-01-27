import { create } from 'zustand'

interface CommerceStore {
    token: string,
    setToken: (token: string) => void
    cart: {},
    addOneToCart: (productId: string) => void,
    removeOneFromCart: (productId: string) => void,

}

export const useCommerceStore = create<CommerceStore>((set) => ({
    token: '',
    setToken: (token) => set((state) => ({ token: token })),
    cart: {},
    addOneToCart: (productId) => set((state) => {
        // @ts-ignore
        let newCount = (state.cart[productId] || 0) + 1
        return {
            cart: { ...state.cart, [productId]: newCount }
        }
    }),
    removeOneFromCart: (productId) => set((state) => {
        // @ts-ignore
        let newCount = (state.cart[productId] || 0) - 1
        // TODO prevent going negative
        return {
            cart: { ...state.cart, [productId]: newCount }
        }
    }),
}))