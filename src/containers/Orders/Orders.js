import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component { 
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) { // turn the res.data object into an array
          //console.log(res.data);
          //console.log(res.data[key]);
          //console.log(key) // ids created by firebase - unique so it makes for a perfect key
          fetchedOrders.push({
            id: key,
            ...res.data[key] // access the value of res.data (the orders) and push into fetchedOrders array
          }); 
        }
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch (err => {
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order =>(
          <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);