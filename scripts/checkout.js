import renderOrderSummary from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts} from "../data/products.js";
// Runs all the code inside this file without importing anything
// import "../data/car.js";

loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
