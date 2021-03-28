import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


/* 
  The root page for our application. This covers Layout and everything else.
*/
class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
