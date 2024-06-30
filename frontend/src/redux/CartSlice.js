import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cart_noofItems: 0,
    cartTotalAmount: 0,
    shop: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const { item,shop } = action.payload;

            console.log("Adding item:", item);
            console.log("Current shop:", state.shop);
            console.log("Incoming shop:", shop);
            
            if (state.cartItems.length === 0 || state.shop.shopname === item.shop) {

                const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem._id === item._id);

                if (existingItemIndex !== -1) {
                    state.cartItems[existingItemIndex].qnty += 1;
                } 
                else {
                    const newItem = { ...item, qnty: 1 };
                    state.cartItems.push(newItem);
                    state.cart_noofItems += 1;
                }

                state.cartTotalQuantity += 1;
                state.cartTotalAmount += item.price;

                state.shop = shop;
            } 
            else {
                throw new Error(`Cannot add items from different shops. Please clear your cart to add items from ${item.shop}`);
            }
        },
        removeFromCart: (state, action) => {
            
            const item = action.payload;
            const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem._id === item._id);

            if (existingItemIndex !== -1) {
                const existingItem = state.cartItems[existingItemIndex];
                if (existingItem.qnty > 1) {
                    existingItem.qnty -= 1;
                } else {
                    state.cartItems.splice(existingItemIndex, 1);
                    state.cart_noofItems -= 1;
                }

                state.cartTotalQuantity -= 1;
                state.cartTotalAmount -= existingItem.price;
            }

            if(state.cartItems.length === 0){
                state.shop = null;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cart_noofItems = 0;
            state.cartTotalAmount = 0;
            state.shop = null;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;