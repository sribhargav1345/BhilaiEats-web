import React, { createContext, useReducer, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {

    switch(action.type){

        case 'ADD':
            return [...state, {
                id: action.id,
                name: action.name,
                price: action.price,
                img: action.img,
                qty: action.qty,
                size: action.size
            }]
        
        case 'REMOVE':
            let newArr = [...state]
            newArr.splice(action.index,1)

            return newArr;
        
        case "UPDATE":
            return state.map((item) => {
                if(item.id === action.id){
                    return {...item, qty: parseInt(action.qty) + item.qty, price: action.price + item.price };
                }
                else{
                    return food;
                }
            });
        
        case "DROP":
            let emptyArray = []
            return emptyArray;
        
        default:
            console.log("Error in Reducer");
    }
};


export const CartProvider = ({children}) => {

    const [ state, dispatch ] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const UseCart = () => useContext(CartStateContext);
export const UseDispatchCart = () => useContext(CartDispatchContext);
