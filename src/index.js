import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

// Enable routing to be used by routing the component you want to have routing in
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
); 

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
