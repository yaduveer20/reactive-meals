import React from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props,ref) => {
    return (
        <div className={classes.input}>
            <label hasFor={props.input.id}>{props.input.label}</label>
            <input ref={ref} {...props.input}/>
        </div>
    )
})

export default Input
