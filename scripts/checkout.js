import renderOrderSummary from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProdutsFetch} from "../data/products.js";
import {loadCart} from "../data/cart.js";
import { addEventListeners } from "./listeners.js";
// Runs all the code inside this file without importing anything
//import "../practice/promises.js";

// Makes a function return a promise
async function loadPage(){
  // Lets us write asynchronus code like normal code (inside of an async context)
  // Using await lets us get the value returned from a promise and store it in a variable
  try {
    // If we manually create an error its value will be saved in the error variable
    // of the catch block of code
    // throw 'error1';
    // Put here the code that could cause an error making a request in this case
    // or something else
    await loadProdutsFetch();
    await new Promise((resolve, reject) => {
      loadCart(() => {
        // Reject function lets us create an error in the future
        // reject('hahahhaha');
        resolve();
      })
    })
  } catch(error) {
    console.error('Error caught! ' + error);
  }

  // Render the page
  renderOrderSummary();
  renderPaymentSummary();

  // Add event listeners  
  // addEventListeners();

  // It's the same resolve('value2') in strict promises
  //return 'value2';
}

// Await lets us wait for a promise to finish
// before going on the next line of code.
loadPage();


/** BACKEND PROMISE */
/*
loadProdutsFetch()
.then(() => {
  return loadCartFetch();
})
.then(() => {
  renderOrderSummary();
  renderPaymentSummary();
}) 
*/

/* PROMISE.ALL METHOD */
// We can give it an array of promises and this will wait
// for all of them to finish and then go to the next step
/*
Promise.all([
  loadProdutsFetch(),
  loadCartFetch()
])
// After we've loaded all the backend information needed
// we can render/display the page
.then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/


/* PROMISES METHOD */
// Promise, it needs a function and it will run it immediately
// This arrow function accepts two parameters -> resolve and reject
// which are basically functions
/*
new Promise((res, _) => {
  // Res will wait for this function to be executed
  // Thread like
  loadProducts(() => {
    // We can pass a parameter to the res() function in order to share a value
    // between this step and the next one
    res('value'); // goes to the next step (then function)
  });

})
.then((value) => {
  return new Promise((res, _) => {
    loadCart(() => {
      console.log(value)
      res();
    });
  });

})
.then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* CALLBACK METHOD */
/*
loadProducts(()=>{
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
