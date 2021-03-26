import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

/* 
  This is for all the build controls on each ingredients
*/
const controls = [
  { igLabel: 'Salad', type: 'salad' }, // Note: type here must match type in the switch statement in burger ingredient component
  { igLabel: 'Bacon', type: 'bacon' },
  { igLabel: 'Cheese', type: 'cheese' },
  { igLabel: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl 
          key={ctrl.igLabel} 
          igLabel={ctrl.igLabel}
          added={() => props.ingredientAdded(ctrl.type)} // execute the fn ref i.e., addIngredientHandler
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
    </div>
  )
};

export default buildControls;