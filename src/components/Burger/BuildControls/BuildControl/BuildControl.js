import React from 'react';
import classes from './BuildControl.css';

/* 
  This is for a single build control (More Or Less) for an ingredient
*/
const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.igLabel}>{props.igLabel}</div>
    <button 
      className={classes.Less} 
      onClick={props.removed} 
      disabled={props.disabled}>Less</button>
    <button 
      className={classes.More} 
      onClick={props.added}>More</button>
  </div>
);
export default buildControl;