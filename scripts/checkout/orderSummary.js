// Import the cart,products modules (named exports)
import {cart,removeFromCart,updateCartQuantity,getProductQuantity,updateFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
// Default exports (ESM version -> Ecmascript module)
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let cartSummaryHTML = ``;

// MVC techniqeue (Model -> View -> Controller)
export function renderOrderSummary(){
    cartSummaryHTML = '';
    // Find the order summary
    const summaryElement = document.querySelector('.js-order-summary');
    //document.querySelector('.js-checkout-quantity').innerHTML = updateCartQuantity('.js-checkout-quantity') + " items";

    cart.forEach((cartItem)=>{ 
        const productId = cartItem.productId;

        let matchingProduct;

        // Find the product
        products.forEach((product)=>{
            if(product.id === productId) matchingProduct = product; 
        })

        const deliveryOptionId = cartItem.deliveryOptionId; 

        let deliveryOption;

        deliveryOptions.forEach((option)=>{
            if(option.id === deliveryOptionId) deliveryOption = option;
        })

        // Get the date and format it
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
        const dateString = deliveryDate.format('dddd, MMMM D');


        cartSummaryHTML+=`
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id} none">
                    <span class="save-quantity-link js-save-quantity-link-${matchingProduct.id} link-primary none" data-product-id=${matchingProduct.id}>Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options" data-product-id=${matchingProduct.id} data-product-delivery-id=${cartItem.deliveryOptionId}>
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
            </div>
        </div>
        `
    });

    summaryElement.innerHTML=cartSummaryHTML;

    // Generates the HTML for the delivery options for each product - function
    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOption)=>{
            // Get the date and format it
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
            const dateString = deliveryDate.format('dddd, MMMM D');

            // Get the current price
            const priceString = deliveryOption.priceCents != 0 ? `$${formatCurrency(deliveryOption.priceCents)}` : 'FREE';
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html+=`
            <div class="delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id=${deliveryOption.id}>
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
                </div>
            </div>
            `;
        });
        return html;
    }

    // Remova an all container - procedure
    function removeContainer(productId){
        // Remove the container from the page
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();
        //document.querySelector('.js-checkout-quantity').innerHTML = updateCartQuantity('.js-checkout-quantity') + " items";
    }

    // Deletes a product from the cart
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            removeFromCart(productId);
            removeContainer(productId);
            renderPaymentSummary();
        });
    });

    // Update & save a new product quantity in the cart
    document.querySelectorAll('.update-quantity-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;

            // Hide the update label and the current quantity
            document.querySelector(`.js-quantity-label-${productId}`).classList.add('none');
            link.classList.add('none');

            // Make the input quantity label and save button appear
            document.querySelector(`.js-quantity-input-${productId}`).classList.remove('none');
            document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('none');

            // Set the previous quantity in the input label
            document.querySelector(`.js-quantity-input-${productId}`).value = getProductQuantity(productId);
        });
    });

    // Save the quantity for a product 
    document.querySelectorAll('.save-quantity-link').forEach((link)=>{
        link.addEventListener(('click'),()=>{
            // Get the product id and the input element
            const productId = link.dataset.productId;
            const inputElement = document.querySelector(`.js-quantity-input-${productId}`);

            // Quantity
            let quantity = inputElement.value;

            // Check whether the input label is empty or not
            if(quantity === '') quantity = getProductQuantity(productId);

            // Update from cart
            let update = updateFromCart(productId,quantity);

            if(update === 1) {
                // Make the input quantity label and save button appear
                document.querySelector(`.js-quantity-input-${productId}`).classList.add('none');
                document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('none');

                document.querySelector(`.js-quantity-label-${productId}`).classList.remove('none');
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = getProductQuantity(productId);
                document.querySelector(`.js-update-link-${productId}`).classList.remove('none');
                document.querySelector('.js-checkout-quantity').innerHTML = updateCartQuantity('.js-checkout-quantity') + " items";
            } else if(update === 0) {
                removeFromCart(productId);
                removeContainer(productId);
            } else {
                alert('Please insert a valid quantity!');
            }
            renderPaymentSummary();
        });
    })

    // Update the delivery option for each product
    document.querySelectorAll('.js-delivery-option').forEach((option)=>{
        option.addEventListener('click',()=>{
            const {productId, deliveryOptionId} = option.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
renderOrderSummary();