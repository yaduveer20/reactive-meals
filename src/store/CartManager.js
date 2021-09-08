import React, {useReducer} from 'react'
import CartContext from './cart-context'

const initialCartState = {
    items: [],
    totalAmount: 0
}

const getTotalAmount = (prevTotal,amount,price)=>{
    return prevTotal + amount*price
}

const cartReducer = (state,action)=>{
    if(action.type === 'ADD-ITEM'){
        // console.log('inside cartReducer')
        let updatedItems;
        if(state.items.some(item=> action.item.id === item.id)){
            const itemAtIndex = state.items.findIndex(item=> item.id === action.item.id)
            // const currentItem = state.items.slice(itemAtIndex,itemAtIndex+1)[0]
            const currentItem = state.items[itemAtIndex]
            const newAmount = +currentItem.amount + +action.item.amount
            // const newItem = {
            //     id: currentItem.id,
            //     name: currentItem.name,
            //     price: currentItem.price,
            //     amount: newAmount
            // }

            // const updatedItem = {...currentItem, amount: newAmount}
            // updatedItems = [...state.items.slice(0,itemAtIndex), updatedItem ,...state.items.slice(itemAtIndex+1)]
            updatedItems = [...state.items]
            updatedItems[itemAtIndex] = {...currentItem, amount: newAmount}
        }
        else{
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: getTotalAmount(state.totalAmount,action.item.amount,action.item.price)
        }
    }

    if(action.type === 'INCREMENT'){
        const currentIndex = state.items.findIndex(item=> item.id === action.id)
        const currentItem = state.items[currentIndex]
        const updatedTotalAmount = state.totalAmount + currentItem.price

        const updatedItems = [...state.items]
        updatedItems[currentIndex] = {...currentItem, amount: +currentItem.amount+1}
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'DECREMENT'){
        const currentIndex = state.items.findIndex(item=>item.id === action.id)
        const currentItem = state.items[currentIndex];
        const updatedTotalAmount = state.totalAmount - currentItem.price

        let updatedItems;
        if(currentItem.amount === 1){
            updatedItems = [...state.items.filter(item=> item.id !== action.id)]
        }
        else{
            const updatedAmount = currentItem.amount-1;
            updatedItems = [...state.items]
            updatedItems[currentIndex] = {...currentItem, amount: updatedAmount}
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR-CART'){
        return initialCartState
    }

    return initialCartState;
}


const CartManager = (props)=>{
    const [cartState, dispatchCart] = useReducer(cartReducer, initialCartState)

    const addItemToCart = item=>{
        dispatchCart({type: 'ADD-ITEM', item: item})
        // console.log('cartState', cartState.items)
    }

    const getCartState = ()=>{
        return cartState
    }

    const incrementItemInCart = id=>{
        dispatchCart({type: 'INCREMENT', id})
    }

    const decrementItemInCart = id=>{
        console.log('decrement handler')
        dispatchCart({type: 'DECREMENT', id})
    }

    const clearCart = ()=>{
        dispatchCart({type: 'CLEAR-CART'})
    }

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCart,
        getCartState,
        incrementItem: incrementItemInCart,
        decrementItem: decrementItemInCart,
        clearCart
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartManager