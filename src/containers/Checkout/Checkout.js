import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search); // extract the url 'search' query param
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) { // entries() is a method provided by SearchParams
      // ['salad', 1]
      if (param[0] === 'price') {
        price = param[1]; // price value
      } else {
        ingredients[param[0]] = +param[1]; // salad = 1
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price}); // display ingredients from burgerbuilder to checkout page
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render = {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}/> {/* {...props} will include any props we get from Routing (<Route/>) - match, location, history etc.. */} 
      </div>
    );
  }


}

export default Checkout;