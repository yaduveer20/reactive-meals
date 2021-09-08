import React, {useContext,useState} from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'


const Cart = (props) => {
    const cartContext = useContext(CartContext)
    const [isOrderActive, setIsOrderActive] = useState(false)
    const [isOrderSubmitting, setIsOrderSubmitting] = useState(false)
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)

    const cartState = cartContext.getCartState()

    const onDecrementHandler = (id) => {
        cartContext.decrementItem(id)
    }

    const onIncrementHandler = id => {
        cartContext.incrementItem(id);
    }

    const onOrderHandler = ()=>{
        setIsOrderActive(true)
    }

    const onCloseHandler = ()=>{
        cartContext.clearCart();
        props.onCloseCart();
    }

    const onConfirmHandler = async userData=>{
        console.log('userData', userData)
        setIsOrderSubmitting(true)
        const response = await fetch('https://reactivemeals-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                userData,
                orderedItems: {...cartState.items} 
            })
        })

        if(response.ok) setIsSubmitSuccessful(true)

        setIsOrderSubmitting(false)
    }



    const cartItems = props => {
        console.log('cartState', cartState.items)
        return <ul className={classes['cart-items']}>
            {/* {dummyItems.map(item=><li>{item.name}</li>)} */}
            {cartState.items.map(item => 
                <CartItem name={item.name} identity={item.id} price={item.price} amount={item.amount} onDecrement={onDecrementHandler} onIncrement={onIncrementHandler} />
            )}
        </ul>
    }

    const totalAmount = `$${cartState.totalAmount.toFixed(2)}`

    const orderControl = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
        <button className={classes.button} onClick={onOrderHandler}>Order</button>
    </div>

    const modalChildren = <React.Fragment>
        {cartItems()}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isOrderActive && <Checkout onConfirm={onConfirmHandler} onClose={props.onCloseCart} />}
        {!isOrderActive && orderControl}
    </React.Fragment>


    const successfulSubmit = <React.Fragment>
        <p>Successfully submitted your order!</p>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onCloseHandler}>Close</button>
        </div>
    </React.Fragment>



    return (
        <Modal>
            {isOrderSubmitting && <p>Submitting your order...</p>}
            {isSubmitSuccessful && successfulSubmit}
            {!isOrderSubmitting && !isSubmitSuccessful && modalChildren}
        </Modal>
    )
}

export default Cart
