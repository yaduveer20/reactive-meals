import React from 'react'
import classes from './MealsWrapper.module.css';

const MealsWrapper = props => {
    return (
        <div className={classes.wrapper}>
            {props.children}
        </div>
    )
}

export default MealsWrapper
