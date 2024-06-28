import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart : (state, action) => {

            const item = action.payload;

            console.log(state);
            const existingItem = state.cartItems.find((cartItem) => cartItem._id === item._id);

            if(existingItem){
                existingItem.quantity += item.quantity;
            }
            else{
                state.cartItems.push({ item });
            }

            console.log(state.cartItems);

            state.cartTotalQuantity += 1;
            state.cartTotalAmount += item.price;
        },
        removeFromCart : (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);

            if(existingItem){
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                }
                else{
                    state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== item._id);
                }

                state.cartTotalQuantity -= 1;
                state.cartTotalAmount -= existingItem.price;
            }
        }
    }
});

export const { addToCart, removeFromCart }  = cartSlice.actions;
export default cartSlice.reducer;