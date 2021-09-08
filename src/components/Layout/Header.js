import classes from './Header.module.css';
import React  from 'react';
import CartButton from './CartButton';
import mealsImage from '../../assets/meals.jpg';
import MealsTagline from '../Meals/MealsTagline';

const Header = (props)=>{
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactiveMeals</h1>
                <CartButton onClickCart={props.onClickCart} />
            </header>;
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='image containing food' />
            </div>
            <MealsTagline />
        </React.Fragment>
    );
}

export default Header;