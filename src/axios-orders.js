import axios from 'axios';


/* working with axios instance -- all about flexibility
allows you to control in detail, in which part of your app you want to use which default settings */

const instance = axios.create({
  baseURL: 'https://react-my-burger-e8d12-default-rtdb.firebaseio.com/' // url to send request to, to store data in database
});

export default instance;