import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink 
      to={props.link}
      exact={props.exact} // only 'active' (or used) if it is exactly the selected link
      activeClassName={classes.active} > {/* using css 'active' class name as defined in NavigationItem.css */}
      {props.children} 
    </NavLink>
  </li>
);

export default navigationItem;