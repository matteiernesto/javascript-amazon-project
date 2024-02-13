// Import the cart,products modules
import {cart,removeFromCart,updateCartQuantity,getProductQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let cartSummaryHTML = ``;
// Find the order summary
const summaryElement = document.querySelector('.js-order-summary');
document.querySelector('.js-checkout-quantity').innerHTML = updateCartQuantity('.js-checkout-quantity') + " items";

cart.forEach((cartItem)=>{ 
    const productId = cartItem.productId;

    let matchingProduct;

    // Find the product
    products.forEach((product)=>{
        if(product.id === productId) matchingProduct = product; 
    })

    console.log(matchingProduct);

    cartSummaryHTML+=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id} none">
                <span class="save-quantity-link js-save-quantity-link-${matchingProduct.id} link-primary none" data-product-id=${matchingProduct.id}>Save</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `
});

summaryElement.innerHTML=cartSummaryHTML;

// Deletes a product from the cart
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        // Remove the container from the page
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();
        document.querySelector('.js-checkout-quantity').innerHTML = updateCartQuantity('.js-checkout-quantity') + " items";
    });
});

// Update & save a new product quantity in the cart
document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

        // Hide the update label and the current quantity
        quantityLabel.classList.add('none');
        link.classList.add('none');

        // Make the input quantity label and save button appear
        document.querySelector(`.js-quantity-input-${productId}`).classList.remove('none');
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('none');

        // Set the previous quantity in the input label
        document.querySelector(`.js-quantity-input-${productId}`).value = getProductQuantity(productId);
    });
});

document.querySelectorAll('.save-quantity-link').forEach((link)=>{
    link.addEventListener(('click'),()=>{
        // Get the product id
        const productId = link.dataset.productId;

        
        
    });
})