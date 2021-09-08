import classes from './CartItem.module.css';

const CartItem = (props) => {
    console.log('inside cartitem', props)
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onDecrement.bind(null,props.identity)}>−</button>
        <button onClick={props.onIncrement.bind(null,props.identity)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
