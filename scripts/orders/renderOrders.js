import { orders } from "../../data/orders.js";
import { formatCurrency } from "../utils/money.js";
import { renderAllProducts } from "./renderProducts.js";
// Default exports (ESM version -> Ecmascript module)
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

/**
 * This method will render all the orders within the page.
 */
export function renderAllOrders(){
    // Loop through the list of orders and render them into the page
    orders.forEach(order => {
        renderSingleOrder(order);
    })
}

export function renderSingleOrder(order){
    // Get the orders grid container in which all products will be displayed
    const ordersGrid = document.querySelector(`.orders-grid`);

    // Get the date of the order
    const date = dayjs(order.orderTime);
    const dateToDisplay = date.format("MMMM D");

    // Render the order header that displays the summarised information
    ordersGrid.innerHTML += `
    <div class="order-container">
        <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateToDisplay}</div>
                </div>
                <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
            </div>

            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
            </div>
        </div>

        <div class="order-details-grid" id="${order.id}"></div>
    </div>
    `;

    // Get all the products that have been ordered
    const products = order.products;

    // Render them to the page
    renderAllProducts(products, order.id);
}