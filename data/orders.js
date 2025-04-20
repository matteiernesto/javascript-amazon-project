export const orders = loadFromStorage() || [];

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

// Save all the information into localStorage - procedure
function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}

// Load from storage - function
function loadFromStorage(){
  return JSON.parse(localStorage.getItem('orders'));
}

/**
 * This method will look an id based on its id.
 * 
 * @param id
 * @return order
 */
export function getOrderById(id){
  // Value to be returned
  let ret = null;

  // Loop through the array and look for the order
  orders.forEach(order => {
    if(order.orderId === id) ret = order;
  })

  // Return the value
  return ret;
}