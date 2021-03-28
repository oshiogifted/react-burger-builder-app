import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

/* 
  This is the content of what's displayed in the modal
*/
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)// <li> Salad: 1</li>
  .map(igKey => {
    return (
      <li key={igKey}> {/* unique id key as requested by React, else we get a warning */}
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
      </li> ); // key: value -> salad: 1, or meat: 2
  });

  return (
    <Aux>
      <h3> Your Order </h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Order Total: {props.orderTotal.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button 
      btnType="Danger" 
      clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button 
      btnType="Success" 
      clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;