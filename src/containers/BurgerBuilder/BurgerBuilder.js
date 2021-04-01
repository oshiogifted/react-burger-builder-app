import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// this is a global constant
// this contains the dollar price for each ingredient
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    // ingredients contain the amount of each ingredient item (they are not strings, they are numbers aka integer values)
    // ingredients is now set to 'null' since we're dynamically GETTING it from the server (firebase) using axios in componentDidMount
    ingredients: null,
    totalPrice: 4, // $4 is base price for everything
    purchasable: false, // true when item is purchasable (at least 1 ingredient has a quantity of 1 or more)
    purchasing: false, // for when the "Order Now" button is clicked
    loading: false, // when true, show spinner, when false, show order summary component 
    error: false // true if we catch an error (in componentDidMount)
  };

  componentDidMount () {
    // if we couldn't get (i.e., the link is broken) we'll show the spinner
    axios.get('https://react-my-burger-e8d12-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data}); // 'data' contains the data we fetch
      })
      .catch(error => {
        this.setState({error: true})
      });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    //console.log("old count - " + oldCount);
    const updatedCount = oldCount + 1;
    const updatedIngredients =  {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    //console.log("[addIngredientHandler] this is old price => " + oldPrice);
    //console.log("[addIngredientHandler] this is new price => " + newPrice);
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    //console.log("old count - " + oldCount);
    const updatedCount = oldCount - 1;
    const updatedIngredients =  {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    //console.log("[removeIngredientHandler] this is old price => " + oldPrice);
    //console.log("[removeIngredientHandler] this is new price => " + newPrice);
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients) // get the key
    .map(igKey => {
      return ingredients[igKey]; //... then get the value
    })
    .reduce((sum, el) => { // then total the values in the array reducing it
      return sum + el; // sum at first is 0 (initial value) + el (first value in the array)
    }, 0); 
    this.setState({purchasable: sum > 0}); 
  };

    /* Tried this way but didn't work to handle purchase but it didn't work... hmmm
  purchasingHandler = (state) => {
    this.setState({pruchasing: state});
  } 
  */

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    //alert('You continue!');
    this.setState ({loading: true}); // we're loading when we click "continue" in modal
    const order = {
      // dummy order to store in firebase backend
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // should be calculated on the server ;)
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
        this.setState({loading: false, purchasing: false}); // this will show order summary
      })
      .catch(error => {
        //console.log(error); // log error -- debug purposes
        // stop loading even if an error occured
        // purchasing to false closes the modal
        this.setState({loading: false, purchasing: false}); // this will show order summary (but we close the modal with purchasing: false)
      }); 
  }



  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // this check returns true or false (i.e., {salad: true, meat: false, ...}) 
    //disabledInfo[key] is the value of keys in ingredients (0, 1, ...)
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // disabledInfo[key] reads true if disabled[key] is <= 0 
      //console.log("disabledInfo[key] => " + disabledInfo[key]);
    }

    // orderSummary uses ingredients so we set orderSummary to null the first time render() runs
    let orderSummary = null;

    // logic to display spinner while we wait for burger to load (componentDidMount is async so render() will get called and ingredients is set to null)
    // don't show the spinner (show "Ingredients can't..."") if we caught an error (with catch in componentDidMount) else... 
    // ...show spinner if ingredients is null (while we wait to fetch ingredients from the server)
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />; 

    if (this.state.ingredients) { // if ingredients is not null (if it's true)
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo} 
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler} />
        </Aux>
        );
      // logic to display either spinner or order summary (1)
      orderSummary = <OrderSummary
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      ingredients={this.state.ingredients}
      orderTotal={this.state.totalPrice}/>
    }

    // logic to display either spinner or order summary (2)
    // need to set/override orderSummary (when needed) to spinner when we click "continue" button in modal
    if (this.state.loading) {
      orderSummary = <Spinner />; // orderSummary won't be a spinner until we click "continue" which will set loading to true (purchaseContinueHandler)
    }

    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}> 
          {orderSummary}
         </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);