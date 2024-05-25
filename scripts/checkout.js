import renderOrderSummary from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts} from "../data/products.js";
import {loadCart} from "../data/cart.js";
// Runs all the code inside this file without importing anything
//import "../practice/promises.js";

/* PROMISE.ALL METHOD */
// We can give it an array of promises and this will wait
// for all of them to finish and then go to the next step
Promise.all([
  new Promise((res, _) => {
    // Res will wait for this function to be executed
    // Thread like
    loadProducts(() => {
      // We can pass a parameter to the res() function in order to share a value
      // between this step and the next one
      res('value1'); // goes to the next step (then function)
    });
  }),
  new Promise((res, _) => {
    loadCart(() => {
      res('value2');
    });
  })
])
// After we've loaded all the backend information needed
// we can render/display the page
.then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
});

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
