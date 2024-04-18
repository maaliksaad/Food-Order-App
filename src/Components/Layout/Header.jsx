import React from 'react';
import mealsimg from '../../assets/meals.jpg';
import HeaderCartButton from '../Cart/HeaderCartButton/HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
    <header className={classes.header}>
    <h1>React Meals</h1>
    <HeaderCartButton onClick={props.onShowCart} />
    </header>
    <div className={classes['main-image']}>
        <img src={mealsimg} alt="Food" />
    </div>
    
    </>
  )
}

export default Header