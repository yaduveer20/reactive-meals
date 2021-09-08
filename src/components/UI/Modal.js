import React from 'react'
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'

// const Backdrop = ()=>{
//     return(
//         <div className={classes.backdrop} />
//     )
// }

// const Overlay = props=>{
//     return (
//         <div className={classes.modal}>
//             {props.children}
//             {/* <div className={classes.content}>{props.children}</div> */}
//         </div>
//     )
// }

// const Modal = (props) => {
//     const portalEnd = document.getElementById('overlay')
//     return (
//         <React.Fragment>
//             {ReactDOM.createPortal(<Backdrop />, portalEnd)}
//             {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, portalEnd)}
//         </React.Fragment>
//     )
// }

const Backdrop = ()=>{
   return <div className={classes.backdrop} /> 
}

const Overlay = props=>{
    return <div className={classes.modal}>
        {props.children}
    </div>
}

const Modal = props=>{
    const portalEnd = document.getElementById('overlay')

    return <React.Fragment>
        {ReactDOM.createPortal(<Backdrop />, portalEnd)}
        {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,portalEnd)}
        </React.Fragment>
}

export default Modal



