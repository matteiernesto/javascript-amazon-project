// Create the cart containing all the products added
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
    cart = [{
        // Normalizing the data
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }];
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

// Add product - procedure
export function addToCart(productId){
    // Get the select item and its value
    const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectElement.value);
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId) matchingItem = cartItem;   
    });

    // Check whether I found the element or not
    if(matchingItem) matchingItem.quantity += quantity;
    else {
        cart.push({
        productId,
        quantity
    })};

    // Update the cart quantity displayed in the page
    saveToStorage();
    console.log(cart);
}

// Remove product - procedure
export function removeFromCart(productId){
    cart.forEach((cartItem,index)=>{
        if(cartItem.productId === productId) cart.splice(index,1);
    });
    saveToStorage();
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

// Get the product quantity
export function getProductQuantity(productId){
    // Return value
    let quantity = 0;

    // Search for it
    cart.forEach((cartItem)=>{
        if(cartItem.productId === productId) quantity = cartItem.quantity;
    })

    // Return the value
    return quantity;
}
