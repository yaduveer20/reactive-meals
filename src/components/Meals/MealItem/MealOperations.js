import React, { useRef, useContext } from 'react'
import classes from './MealOperations.module.css'
import Input from '../../UI/Input';
// import Meals from '../MealsList';
import CartManager from '../../../store/CartManager'
import CartContext from '../../../store/cart-context'

const MealOperations = (meal) => {
    const inputRef = useRef()

    const id = meal.id

    const cartContext = useContext(CartContext)

    const addToCartSubmitHandler = (event) => {
        event.preventDefault();
        // console.log('submit handler', event.target)
        // console.log('inputRef', inputRef.current.value)
        // console.log('meal', meal)
        // console.log('cart context', cartContext);

        const {price, name,id: mID} = meal.meal
        // console.log(price,name,mID)
        const mealItem = {
            id: mID,
            amount: +inputRef.current.value,
            price: price,
            name: name
        }

        // console.log('mealItem',mealItem)

        // console.log('adding')
        cartContext.addItem(mealItem);

    }

    return (
        <React.Fragment>
            <form className={classes.form}>
                {/* <label hasFor='id'>Amount</label>
                <input id='id' type='number' min='1' max='5' step='1' /> */}
                <Input
                    ref={inputRef}
                    input={{
                        label: 'Amount',
                        id: { id },
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1'
                    }
                    }
                />
                <button onClick={addToCartSubmitHandler} >+Add</button>
            </form>
        </React.Fragment>
    );
}

export default MealOperations