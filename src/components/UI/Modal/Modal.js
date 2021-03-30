import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

/*
  This defines the behavior of the modal & backdrop - styling, showing (or not), etc..
  This wraps the OrderSummary component
*/
class Modal extends Component {

  /* performance check to make sure order summary (which is warpped by the modal) 
  ...only updates if 'show' changes
  */
  shouldComponentUpdate(nextProps, nextState) {
    // if 'show' in the future/next state is not equal to the show in the 'prev' state
    // simplified code to return nextProps.show !== this.props.show;
    /* if (nextProps.show !== this.props.show) {
      return true;
    } */

    return nextProps.show !== this.props.show;
  }

  componentDidUpdate () {
    console.log('[Modal] DidUpdate');
  }
  
  render() {
    return (
      <Aux>
        {/* if the modal is shown, the backdrop should be shown; 
        else, if the modal is not shown, (i.e., 0 opacity) the backdrop (modalClosed) should not be shown*/}
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/> 
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1': '0'
          }}>
          {this.props.children} {/* modal that's wrapped around any children */}
        </div>
    </Aux>
    );
  }
} 

export default Modal;