import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cart_noofItems: 0,
    cartTotalAmount: 0,
    shop: null,
    user_contact: null, 
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {

            const { cartItems, cartTotalQuantity, cartTotalAmount, shop, user_contact } = action.payload;

            state.cartItems = cartItems;
            state.cartTotalQuantity = cartTotalQuantity;
            state.cartTotalAmount = cartTotalAmount;
            state.cart_noofItems = cartItems.length;

            state.shop = shop;
            state.user_contact = user_contact;
        },
        addToCart: (state, action) => {

            const { item, shop, user_contact } = action.payload;

            if (state.user_contact && state.user_contact !== user_contact) {
                throw new Error('Cart does not belong to the logged-in user.');
            }
            
            if (state.cartItems.length === 0 || state.shop.shopname === item.shop) {
                const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem._id === item._id);

                if (existingItemIndex !== -1) {
                    state.cartItems[existingItemIndex].qnty += 1;
                } else {
                    const newItem = { ...item, qnty: 1 };
                    state.cartItems.push(newItem);
                    state.cart_noofItems += 1;
                }

                state.cartTotalQuantity += 1;
                state.cartTotalAmount += item.price;
                state.shop = shop;
            } else {
                throw new Error(`Cannot add items from different shops. Please clear your cart to add items from ${item.shop}`);
            }
        },
        removeFromCart: (state, action) => {
            const { item, user_contact } = action.payload;

            if (state.user_contact !== user_contact) {
                throw new Error('Cart does not belong to the logged-in user.');
            }

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

            if (state.cartItems.length === 0) {
                state.shop = null;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cart_noofItems = 0;
            state.cartTotalAmount = 0;
            state.shop = null;
            state.user_contact = null; 
        }
    }
});

export const { setCart, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
