import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

/*
  This defines the behavior of the modal & backdrop - styling, showing (or not), etc..
  This wraps the OrderSummary component
*/
const modal = (props) => (
  <Aux>
    {/* if the modal is shown, the backdrop should be shown; 
    else, if the modal is not shown, (i.e., 0 opacity) the backdrop (modalClosed) should not be shown*/}
    <Backdrop show={props.show} clicked={props.modalClosed}/> 
    <div 
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'
      }}>
      {props.children} {/* modal that's wrapped around any children */}
    </div>
  </Aux>
);

export default modal;