import React from 'react'
import classes from './FetchMealButton.module.css'

const FetchMealButton = (props) => {
    return (
        <div style={{textAlign: 'center'}}>
            <button className={classes.button} onClick={props.onFetch}>Fetch Meals</button>
        </div>
    )
}

export default FetchMealButton
