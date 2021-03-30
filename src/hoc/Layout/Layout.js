import React, {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
/* 
	This is for laying out our page. It's not the root page however.
*/
class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			// asynchronous behavior of setState may lead to unexpected outcomes
			// this is why we use the function form (using prevState)
			// this is the clean way of setting the state when it depends on the old state
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render () {
		return (
			<Aux>
			<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
			<SideDrawer 
				open={this.state.showSideDrawer} 
				closed={this.sideDrawerClosedHandler} />
			<main className = {classes.Content}>
				{this.props.children}
			</main>
		</Aux>
		)
	}
}

export default Layout;