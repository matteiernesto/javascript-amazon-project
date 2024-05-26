import { getFullCost } from "../../data/cart.js";
import { getShippingCost } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { getCartQuantity } from "../../data/cart.js";
import { cart } from "../../data/cart.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    // Get the full cost and the shipping
    const fullCost = getFullCost();
    const shippingCost = getShippingCost();

    // Add them together to get the cost before taxes
    const costBeforeTaxes = fullCost + shippingCost;

    // Add 10%
    const tax = costBeforeTaxes * 0.1;
    const finalCost = Number((costBeforeTaxes + tax).toFixed(0));

    const paymentSummaryHTML =  `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${getCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatCurrency(fullCost)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(costBeforeTaxes)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(finalCost)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    // Set up an event listener
    document.querySelector('.js-place-order').addEventListener('click', async () => {
        // Error handling because this could cause an error due to connection, internet or something else
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                // POST METHOD lets us send data to the backend
                method: 'POST',
                // Headers gives the backend more information about our request
                headers: {
                    // What type of data we're sending to the backend
                    'Content-Type': 'application/json'
                },
                // The actual data that we're sending to the backend
                body: JSON.stringify({
                    cart: cart
                })
            })
            
            const order = await response.json()

            addOrder(order);
        } catch (error) {
            console.error('Error caught! ' + error);
        }

        // We're going to the orders page
        window.location.href = 'orders.html';
    }); 
}