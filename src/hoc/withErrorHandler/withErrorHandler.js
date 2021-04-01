import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

// anonymous class (the class doesn't have a name)
// withErrorHandler creates these classes when it wraps them
const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null
      }  

      // errors for get -- 
      this.reqInterceptor = axios.interceptors.request.use(req => { // not interested in the request
        // call this.setState and clear any errors whenever we send a request
        this.setState({error: null});
        return req; // when sending the request we have to return the request config so that the request can continue 
      });
      //res => res -- (short-hand syntax) this returns the response 

      // errors for post -- 
      this.resInterceptor = axios.interceptors.response.use(res => res, error=> { // get the error
        console.log(error); // error is an object that contains an error message on the message property
        // show the error modal, and set the error state to the error we're getting from firebase
        this.setState({error: error});
      });
    }

    // used to clean up network requests,interceptors, etc.. to prevent memory leaks
    // its called before the component is destroyed (for example, when we switch pages from burger builder to checkout)
    componentWillUnmount() {
      //console.log('[withErrorHandler] componentWillUnmount ', this.reqInterceptor, this.resInterceptor); // for testing
      axios.interceptors.rquest.eject(this.reqInterceptor);
      axios.interceptors.rquest.eject(this.resInterceptor);
    }

    

/*    Moved this to constructor due to lifecycle clashes -- we simply don't show the modal with error msg but we want to, so we need to execute..
      ..the function as soon as it gets loaded, therefore we moved it to the constructor 
    componentDidMount () {
      axios.interceptors.request.use(req => { // not interested in the request
        // call this.setState and clear any errors whenever we send a request
        this.setState({error: null});
        return req; // when sending the request we have to return the request config so that the request can continue 
      });
      //res => res -- (short-hand syntax) this returns the response 
      axios.interceptors.response.use(res => res, error=> { // get the error
        console.log(error); // error is an object that contains an error message on the message property
        // show the error modal, and set the error state to the error we're getting from firebase
        this.setState({error: error});
      });
    }
 */
    // when we click the backdrop, clear the error
    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error} // only show if this.state.error is not null 
            modalClosed={this.errorConfirmedHandler}> 
            {this.state.error ? this.state.error.message: null} {/* 'message' is a property on the error returned by firebase; need to check if its null or not*/}
            {/* placeholder text - Something didn't work; replaced with this.state.error.message*/}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  } 
}
export default withErrorHandler;