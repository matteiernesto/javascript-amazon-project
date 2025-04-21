import { checkQueryParams, getQueryParam } from './utils/url.js';
import { getOrderById } from '../data/orders.js';
import { renderAllOrders } from './orders/renderOrders.js';

// Orders container
let ordersContainer = document.querySelector("orders-grid");

// Check if the user has just placed a new order
if(!checkQueryParams(["order-id"])){
    
}

// Get the id of the order
const orderID = getQueryParam("order-id");

// Get the order from the list
const order = getOrderById(orderID);

if(!order){
  renderAllOrders();
} else {
  renderOrder();
}


