import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props) => {
  //... attach some css classes to make sure we play some animations when the drawer is shown
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/> {/* show is boolean, and it's set to true (no need to set it like show={true}, just add it ) */}
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav> {/* you could outsource <nav> tag into navigation items */}
        <NavigationItems />
        </nav>
      </div>
    </Aux>
  );

};

export default sideDrawer;