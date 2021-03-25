import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { igLabel: 'Salad', type: 'salad' }, // Note: type here must match type in the switch statement in burger ingredient component
  { igLabel: 'Bacon', type: 'bacon' },
  { igLabel: 'Cheese', type: 'cheese' },
  { igLabel: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl key={ctrl.igLabel} igLabel={ctrl.igLabel} />
      ))}
    </div>
  )
};

export default buildControls;