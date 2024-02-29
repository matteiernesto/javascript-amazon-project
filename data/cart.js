// Import the products
import {getProduct} from "./products.js";
import {getDeliveryOption} from "./deliveryOptions.js";

// Create the cart containing all the products added
export let cart;
loadFromStorage();

// Loads the cart from the localStorage - procedure
export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart) {
        cart = [{
            // Normalizing the data
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'  
        },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

// Add product - procedure
export function addToCart(productId){
    // Get the select item and its value
    // const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
    // const quantity = Number(selectElement.value);
    let quantity = 1;
    let matchingItem = getCartItem(productId);

    // Check whether I found the element or not
    if(matchingItem) matchingItem.quantity += quantity;
    else {
        cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
    })};

    // Update the cart quantity displayed in the page
    saveToStorage();
}

// Remove product - procedure
export function removeFromCart(productId){
    cart.forEach((cartItem,index)=>{
        if(cartItem.productId === productId) cart.splice(index,1);
    });
    saveToStorage();
}

// Update a product - procedure
// Returns 1 if the procedure has succeded
// Returns -1 if the procedure has failed
// Returns 0 if the product has been deleted
export function updateFromCart(productId,quantity){
    // Get the number
    let q = Number(quantity);

    // Check if the quantity is 0
    if(q === 0){
        removeFromCart(productId);
        return 0;
    } else if(q < 0 || isNaN(q) || !Number.isInteger(q)) return -1;
    else if(q!=getProductQuantity(productId)) {
        // Find the product and change its quantity
        cart.forEach((cartItem)=>{
            if(cartItem.productId === productId) cartItem.quantity = q;
        })
        saveToStorage();
        return 1;
    }

    return 1;
}

// Update the cart - procedure
export function updateCartQuantity(){
    let quantity = 0;
    cart.forEach((cartItem)=>{
        quantity+=cartItem.quantity;
    });    

    // Update the HTML
    return quantity;
}

// Get the product quantity - function
export function getProductQuantity(productId){
    // Return value
    let quantity = 0;

    // Search for it
    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId) quantity = cartItem.quantity;
    })

    // Return the value
    return Number(quantity);
}

// Get a product from the cart - function
function getCartItem(productId){
    // Return value
    let ret;
    // Loop through the cart and find the product
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId) {  
            ret = cartItem;
        }
    });    

    // Return the value
    return ret;
}

// Update the delivery option of a product - procedure
export function updateDeliveryOption(productId,deliveryOptionId){
    // Get the product
    let product = getCartItem(productId);

    // Update the delivery option
    product.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

// Get the entire cost of the cart
export function getFullCost(){
    // Ret value
    let ret = 0;

    // Loop through the cart
    cart.forEach((cartItem)=>{
        // Obtain the current product
        let product = getProduct(cartItem.productId);

        // Get the delivery option
        let option = getDeliveryOption(cartItem.deliveryOptionId);

        // Sum the price times the quantity
        ret+=(product.priceCents*cartItem.quantity);
    })

    // Return the value
    return ret;
}

// Get the entire shipping cost of the cart
export function getShippingCost(){
    // Ret value
    let ret = 0;

    // Loop through the cart
    cart.forEach((cartItem)=>{
        // Get the delivery option
        let option = getDeliveryOption(cartItem.deliveryOptionId);

        // Sum the price times the quantity
        ret+=option.priceCents;
    })

    // Return the value
    return ret;
}

// Get the cart quantity
export function getCartQuantity(){
    // Ret value
    let ret = 0;

    cart.forEach((cartItem)=>{
        ret+=cartItem.quantity;
    })
    
    return ret;
}

