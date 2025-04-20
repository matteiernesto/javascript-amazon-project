import { checkQueryParams, getQueryParam } from './utils/url.js';
import { addOrder } from '../data/orders.js';

// Check if the user has just placed a new order
if(checkQueryParams(["order-id"])){
    // Get the id of the order
    const orderID = getQueryParam("order-id");

    // Add the order to its container with the id related to it
    addOrder(orderID);
}

