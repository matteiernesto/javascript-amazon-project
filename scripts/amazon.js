// Import variables .. -> represents the folder outside
// We can use "as" for naming exported variables
import {cart, addToCart, updateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';

// Get the product grid element
const productsGrid = document.querySelector('.products-grid');
document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

// Loop through the array in order to generate the HTML
products.forEach((product)=>{
    // toFixed() method converts a number into a string and we can specifie
    // how many many decimals we want in the brackets
    const html = `
    <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
            ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
        </button>
        </div>
    `;
    productsGrid.innerHTML += html;
});

let isRunning = false;
let intervalID;

// Add to cart button animation
function addedToCart(productId){
    // Get the added to cart element
    const addToCart = document.querySelector(`.js-added-to-cart-${productId}`);

    if(!isRunning) {
        intervalID = setTimeout(()=>{
            addToCart.classList.remove('added-cart');
            isRunning = true;
        },2000);
        isRunning = true;
    } else {
        clearTimeout(intervalID);
        intervalID = setTimeout(()=>{
            addToCart.classList.remove('added-cart'); 
            isRunning = true;
        },2000);  
    }
    addToCart.classList.add('added-cart');
}

// Make the buttons interactive
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
    button.addEventListener('click',()=>{
        const { productId } = button.dataset;

        // Added animation
        addedToCart(productId);

        // Add to the cart the product
        addToCart(productId);
        document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
    })
});