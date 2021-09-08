import React, { useContext, useState, useEffect } from 'react';
import classes from './CartButton.module.css';
import CartIcon from './CartIcon';
import CartContext from '../../store/cart-context'

const CartButton = (props) => {
    const [isBumped, setIsBumped] = useState(false)
    const cartContext = useContext(CartContext)
    const cartState = cartContext.getCartState()
    const { items } = cartState
    const countOfItems = items.reduce((amount, item) => amount + (+item.amount), 0)

    const bumpClasses = `${classes.button} ${isBumped ? classes.bump : ''}`
    
    //side effect for cart button animation on adding item to cart
    useEffect(() => {
        if (items.length === 0) return;
        setIsBumped(true)

        const timer = setTimeout(()=>{
            setIsBumped(false)
        }, 300)

        return ()=>{
            clearTimeout(timer)
        }
    }, [items])

    // const bumpClasses = `${classes.button} ${classes.bump}`
    // console.log('bump', bumpClasses)
    return (
        <React.Fragment>
            <button className={bumpClasses} onClick={props.onClickCart}>
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>{countOfItems}</span>

            </button>
        </React.Fragment>
    );
}

export default CartButton;