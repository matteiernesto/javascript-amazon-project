// Create the cart containing all the products added
export const cart = [];

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
    console.log(cart);
}