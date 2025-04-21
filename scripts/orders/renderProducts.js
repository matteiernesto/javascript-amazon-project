// Default exports (ESM version -> Ecmascript module)
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

/**
 * This method will render within the page all the producst which
 * refers back to a single order.
 * 
 * @param products
 * @param id
 * @return rendering of the products
 */
export function renderAllProducts(products, id){
    // Loop through the product list and render each product
    products.forEach(product => {
        renderSingleProduct(product, id);
    });
}

function renderSingleProduct(product, id){
    // Get the container in which we will render all the products
    const productsContainer = document.getElementById(id);

    // Get the ETA of the product
    const date = dayjs(product.estimatedDeliveryTime);
    const dateToDisplay = date.format("MMMM D");

    // Add all the product details
    productsContainer.innerHTML += `
    <div class="product-image-container">
        <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
    </div>

    <div class="product-details">
        <div class="product-name">
        Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>
        <div class="product-delivery-date">
        Arriving on: ${dateToDisplay}
        </div>
        <div class="product-quantity">
        Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        </button>
    </div>

    <div class="product-actions">
        <a href="tracking.html">
        <button class="track-package-button button-secondary">
            Track package
        </button>
        </a>
    </div>
    `;
}