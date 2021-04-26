import React from 'react';
import classes from './Order.css';

// Single Order
const order = (props) => {
  const ingredients = [];

  // this is a shorter version of what was done in Burger.js
  for (let ingredientName in props.ingredients){
    ingredients.push(
      {
        name: ingredientName, // ingredient name - salad, bacon
        amount: props.ingredients[ingredientName] //value (1, 2)
      }
    );
  }

  const ingredientOutput = ingredients.map (ig => {
    return <span
      style ={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={ig.name}>{ig.name} ({ig.amount})</span>;
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>CAD {Number.parseFloat(props.price).toFixed(2)}</strong></p>  {/* Number.parseFloat converts a string to a number */}
    </div>
  );

};
export default order;