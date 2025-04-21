import { getQueryParam } from './utils/url.js';
import { getOrderById } from '../data/orders.js';
import { renderAllOrders, renderSingleOrder } from './orders/renderOrders.js';
import { loadProducts } from '../data/products.js';

// Get the id of the order
const orderID = getQueryParam("order-id");

// Get the order from the list
const order = getOrderById(orderID);

// Ternary operator
loadProducts(!order ? 
  // If no order is found, then render all orders
  () => renderAllOrders() : 
  // If order is found, render that single order
  () => renderSingleOrder(order)
);


