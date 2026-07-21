import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CommerceStore {
    token: string,
    setToken: (token: string) => void
    cart: Record<string, number>,
    emptyCart: () => void,
    addOneToCart: (productId: string, productName?: string) => void,
    subtractOneFromCart: (productId: string) => void,
    favoritesToggled: Boolean,
    toggleFavoritesFilter: () => void,
    searchFilter: string,
    setSearchFilter: (searchString: string) => void,
    categoryFilter: string,
    setCategoryFilter: (category: string) => void,
    productSorting: 1 | -1,
    setProductSorting: (sorting: number) => void,
    userName: string,
    setUserName: (userName: string) => void,
    userEmail: string,
    setUserEmail: (userEmail: string) => void,
    userPassword: string,
    setUserPassword: (userPassword: string) => void,
    userConfirmPassword: string,
    setUserConfirmPassword: (userConfirmPassword: string) => void,

    showCart: boolean,
    setShowCart: (value: boolean) => void,
    showConfimModal: boolean,
    setShowConfirmModal: (value: boolean) => void,
    onCancel: Function,
    setOnCancel: (callback: Function) => void,
    onConfirm: Function,
    setOnConfirm: (callback: Function) => void,
    confirmModalMessage: string,
    setConfirmModalMessage: (message: string) => void,
    showReviewModal: boolean,
    setShowReviewModal: (value: boolean) => void,
    productBeingReviewed: any,
    setProductBeingReviewed: (product: any) => void,
    favorites: string[],
    setFavorites: (favorites: string[]) => void,
    cartToast: string,
    clearCartToast: () => void
}

export const useCommerceStore = create<CommerceStore>(
    // @ts-ignore
    persist(
        (set, get) => ({
            token: '',
            setToken: (token) => set((state) => ({ token: token })),
            cart: {},
            emptyCart: () => set((state) => { return { cart: {} } }),
            addOneToCart: (productId, productName) => set((state) => {
                if (!productId || productId === "undefined") {
                    return {}
                }
                const newCount = (state.cart[productId] || 0) + 1
                return {
                    cart: { ...state.cart, [productId]: newCount },
                    ...(productName ? { cartToast: `"${productName}" added to cart` } : {}),
                }
            }),
            subtractOneFromCart: (productId) => set((state) => {
                if (!productId || productId === "undefined") {
                    return {}
                }
                const currentCount = state.cart[productId] || 0
                const newCount = currentCount - 1

                if (newCount <= 0) {
                    const newCart = { ...state.cart }
                    delete newCart[productId]
                    return { cart: newCart }
                }

                return {
                    cart: { ...state.cart, [productId]: newCount }
                }
            }),
            // favorites
            favoritesToggled: false,
            toggleFavoritesFilter: () => set((state) => {
                return {
                    favoritesToggled: !state.favoritesToggled
                }
            }),

            // search state
            searchFilter: '',
            setSearchFilter: (searchString) => set((state) => {
                return {
                    searchFilter: searchString
                }
            }),

            // category filter
            categoryFilter: '',
            setCategoryFilter: (category) => set((state) => {
                return {
                    categoryFilter: category
                }
            }),

            productSorting: 1,
            setProductSorting: (sorting: any) => set((state) => ({
                productSorting: sorting
            })),

            userName: '',
            setUserName: (userName) => set((state) => {
                return {
                    userName: userName
                }
            }),
            userEmail: '',
            setUserEmail: (userEmail) => set((state) => ({ userEmail: userEmail })),
            userPassword: '',
            setUserPassword: (userPassword) => set((state) => ({ userPassword: userPassword })),
            userConfirmPassword: '',
            setUserConfirmPassword: (userConfirmPassword) => set((state) => ({ userConfirmPassword: userConfirmPassword })),
            showCart: false,
            setShowCart: (value: boolean) => set((state) => {
                return {
                    showCart: value,
                    // cart:{}
                }
            }),
            showConfimModal: false,
            setShowConfirmModal: (value) => set((state) => ({
                showConfimModal: value
            })),
            confirmModalMessage: '',
            setConfirmModalMessage: (message: string) => set((state) => ({ confirmModalMessage: message })),
            onCancel: () => { },
            setOnCancel: (callback) => set((state) => ({ onCancel: callback })),
            onConfirm: () => { },
            setOnConfirm: (callback) => set((state) => ({ onConfirm: callback })),

            // reviews
            productBeingReviewed: {},
            setProductBeingReviewed: (product) => set((state) => ({ productBeingReviewed: product })),
            showReviewModal: false,
            setShowReviewModal: (value: boolean) => set((state) => ({ showReviewModal: value })),

            favorites: [],
            setFavorites: (favorites: string[]) => set((state) => ({
                favorites: favorites
            })),
            cartToast: '',
            clearCartToast: () => set({ cartToast: '' }),
        }),
        {
            name: 'the-online-store-app', // name of the item in the storage (must be unique)
        },
    ),
)