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