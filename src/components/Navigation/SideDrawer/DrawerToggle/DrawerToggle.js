import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  /* Changed "MENU" text to hamburger icon using three divs */
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div> 
);

export default drawerToggle;