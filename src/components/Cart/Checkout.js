import React, {useRef, useState} from 'react'
import classes from './Checkout.module.css'

const Checkout = props => {
    const countryRef = useRef()
    const nameRef = useRef()
    const mobileRef = useRef()
    const pinRef = useRef()
    const areaRef = useRef()
    const cityRef = useRef()
    const stateRef = useRef()

    const [formInputsValidity, setFormInputsValidity] = useState({
        country: true,
        name: true,
        mobile: true,
        pin: true,
        area: true,
        city: true,
        state: true
    })

    const isInputValid = value=> value !== ''

    const isPINValid = pin=> pin.length === 6

    const isFormValid = validities=>{
        console.log('inside form')

        for(const key in validities){
            if(!validities[key]) return false
        }

        return true
    }

    const onSubmitHandler = event=>{
        event.preventDefault()
        const formInputs = {
            country: countryRef.current.value,
            name: nameRef.current.value,
            mobile: mobileRef.current.value,
            pin: pinRef.current.value,
            area: areaRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value
        }

        const formInputsValidity = {
            country: isInputValid(formInputs.country),
            name: isInputValid(formInputs.name),
            mobile: isInputValid(formInputs.mobile),
            pin: isPINValid(formInputs.pin),
            area: isInputValid(formInputs.area),
            city: isInputValid(formInputs.city),
            state: isInputValid(formInputs.state)
        } 

        const formValidity = isFormValid(formInputsValidity)

        console.log('form validity', formValidity)

        setFormInputsValidity({
            ...formInputsValidity
        })

        if(!formValidity){
            return;
        }

        props.onConfirm(formInputs)

        // console.log(countryRef.current.value)
    }

    const formItemClasses = {
        country: `${classes.control} ${formInputsValidity.country ? '' : classes.invalid}`,
        name: `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`,
        mobile: `${classes.control} ${formInputsValidity.mobile ? '' : classes.invalid}`,
        pin: `${classes.control} ${formInputsValidity.pin ? '' : classes.invalid}`,
        area: `${classes.control} ${formInputsValidity.area ? '' : classes.invalid}`,
        city: `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`,
        state: `${classes.control} ${formInputsValidity.state ? '' : classes.invalid}`
    }

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={formItemClasses.country}>
                <label htmlFor='country'>Country/Region</label>
                <input ref={countryRef} type='text' id='country' />
                {!formInputsValidity.country && <p>Invalid country</p>}
            </div>
            <div className={formItemClasses.name}>
                <label htmlFor='name'>Full Name</label>
                <input ref={nameRef} type='text' id='name' />
                {!formInputsValidity.name && <p>Invalid name</p>}
            </div>
            <div className={formItemClasses.mobile}>
                <label htmlFor='mobile'>Mobile number</label>
                <input ref={mobileRef} type='number' id='mobile' />
                {!formInputsValidity.mobile && <p>Invalid mobile</p>}
            </div>
            <div className={formItemClasses.pin}>
                <label htmlFor='pin'>PIN</label>
                <input ref={pinRef} type='number' id='pin' />
                {!formInputsValidity.pin && <p>Invalid PIN</p>}
            </div>
            <div className={formItemClasses.area}>
                <label htmlFor='area'>Area, Colony, Street</label>
                <input ref={areaRef} type='text' id='area' />
                {!formInputsValidity.area && <p>Invalid area</p>}
            </div>
            <div className={formItemClasses.city}>
                <label htmlFor='city'>Town/City</label>
                <input ref={cityRef} type='text' id='city' />
                {!formInputsValidity.city && <p>Invalid city</p>}
            </div>
            <div className={formItemClasses.state}>
                <label htmlFor='state'>State/Province/Region</label>
                <input ref={stateRef} type='text' id='state' />
                {!formInputsValidity.state && <p>Invalid state</p>}
            </div>

            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Cancel</button>
                <button>Confirm Order</button>
            </div>

        </form>
    )
}

export default Checkout
