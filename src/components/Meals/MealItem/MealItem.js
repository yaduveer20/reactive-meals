import React from 'react';
import classes from './MealItem.module.css'
import MealOperations from './MealOperations'

const MealItem = ({item: meal}) => {
    return (
        <li className={classes.meal}>
            <div>
                <h3>{meal.name}</h3>
                <div className={classes.description}>{meal.description}</div>
                <div className={classes.price}>${meal.price}</div>
            </div>
            <MealOperations meal={meal}/>
        </li>
    )
}

export default MealItem
