import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existing = state.cartItems.find(item => item._id === action.payload._id)
            if (existing) {
                existing.quantity += 1  // ✅ if already in cart, just increase quantity
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 })  // ✅ add new item
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
        },

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload)
            if (item) item.quantity += 1
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload)
            if (item) {
                if (item.quantity === 1) {
                    state.cartItems = state.cartItems.filter(i => i._id !== action.payload)  // ✅ remove if quantity hits 0
                } else {
                    item.quantity -= 1
                }
            }
        },

        clearCart: (state) => {
            state.cartItems = []
        },
    },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer