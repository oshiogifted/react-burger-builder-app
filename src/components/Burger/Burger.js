import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

  /* This is the same code as the one directly below it
  const ingredientElements = []  
  for (let key in props.ingredients)    
  for (let i = 0; i < props.ingredients[key]; i++)      
  ingredientElements.push(<Ingredient key={key + i} type={key} />)  */

  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => { // igkey = ingredient key -- Note: key is type of ingredients needed & value is how many ingredients needed
      return [...Array(props.ingredients[igKey])].map((_, i) => { // [,] - for example (cheese 2 will be [cheese, cheese])
        return <BurgerIngredient key={igKey + i} type={igKey} />; // igKey + i ==> cheese2, igKey => cheese
      }); 
    })
    .reduce((arr, el) => {
      return arr.concat(el)

    }, []);
  //console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}
export default burger;