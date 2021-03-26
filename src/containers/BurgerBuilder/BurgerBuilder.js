import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    ingredients: {
      // ingredients contain the amount of each ingredient item (they are not strings, they are numbers aka integer values)
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4 // $4 is base price for everything
  };

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
    console.log("[addIngredientHandler] this is old price => " + oldPrice);
    console.log("[addIngredientHandler] this is new price => " + newPrice);
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
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
    console.log("[removeIngredientHandler] this is old price => " + oldPrice);
    console.log("[removeIngredientHandler] this is new price => " + newPrice);
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  };

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // this check returns true or false (i.e., {salad: true, meat: false, ...}) 
    //disabledInfo[key] is the value of keys in ingredients (0, 1, ...)
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // disabledInfo[key] reads true if disabled[key] is <= 0 
      console.log("disabledInfo[key] => " + disabledInfo[key]);
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo} 
          price={this.state.totalPrice}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;