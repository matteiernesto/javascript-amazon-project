import { getFullCost } from "../../data/cart.js";
import { getShippingCost } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { getCartQuantity } from "../../data/cart.js";
export function renderPaymentSummary(){
    // Get the full cost and the shipping
    const fullCost = getFullCost();
    const shippingCost = getShippingCost();

    // Add them together to get the cost before taxes
    const costBeforeTaxes = fullCost + shippingCost;
    console.log(costBeforeTaxes);

    // Add 10%
    const tax = costBeforeTaxes * 0.1;
    const finalCost = Number((costBeforeTaxes + tax).toFixed(0));
    console.log(finalCost);

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

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}