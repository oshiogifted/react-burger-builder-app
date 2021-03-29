import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

/* 
  This is the content of what's displayed in the modal
*/
class OrderSummary extends Component {
  // performance check -- to check when OrderSummary updates
  // this is the only reason why OrderSummary is a class based component
  // otherwise, this is fine as a functional component (the way it was before)
  componentDidUpdate() {
    console.log('[OrderSummary] DidUpdate');
  }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)// <li> Salad: 1</li>
    .map(igKey => {
    return (
      <li key={igKey}> {/* unique id key as requested by React, else we get a warning */}
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li> ); // key: value -> salad: 1, or meat: 2
    });
    return (
      <Aux>
        <h3> Your Order </h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Order Total: {this.props.orderTotal.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button 
          btnType="Danger" 
          clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button 
          btnType="Success" 
          clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;