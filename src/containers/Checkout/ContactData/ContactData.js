import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

// this is a component because we load it via routing and it manages its own form state(s)
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState ({loading: true}); // we're loading when we click "continue" in modal
    const order = {
      // dummy order to store in firebase backend
      ingredients: this.props.ingredients,
      price: this.props.price, // should be calculated on the server ;)
      customer: {
        name: 'Jon Doe',
        address: {
          street: 'Teststreet 1',
          zipCode: 'K4B4Z2',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order) // need to add .json for firebase to function correctly
      .then(response => {
        //console.log(response); // log reponse -- debug purposes
        // stop loading no matter what the response is, because the request is done, even if it failed
        // purchasing: false closes the modal
        this.setState({loading: false}); // this will show order summary
        this.props.history.push('/'); // back to the main burger page (this works in conjuction with {...props} passed in render in Checkout.js for <Route/>)
      })
      .catch(error => {
        //console.log(error); // log error -- debug purposes
        // stop loading even if an error occured
        // purchasing to false closes the modal
        this.setState({loading: false}); // this will show order summary (but we close the modal with purchasing: false)
      });  

  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Sreet"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
        <Button btnType ="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) { 
      form = <Spinner /> // Spinner if loading is true
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Conctact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;