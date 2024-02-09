// Create the cart containing all the products added
const cart = [];

// Update the cart - procedure
function updateCart(){
    // Get the cart element
    const cartElement = document.querySelector('.js-cart-quantity');
    let quantity = 0;
    cart.forEach((item)=>{
        quantity+=item.quantity;
    });    

    // Update the HTML
    cartElement.innerHTML = quantity;
}