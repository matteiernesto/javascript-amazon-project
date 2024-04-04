// The Cart class
class Cart{
    // Fields to make them private we just need to add a # at the front
    #localStorageKey;
    cartItems;

    // Basic constructor that takes in a localStorageKey
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey
        // Loads the basic storage
        this.#loadFromStorage()
    }

    // Loads the cart from the localStorage - procedure
    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if(!this.cartItems) {
            this.cartItems = [{
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
        this.#saveToStorage()
    }

    // Saves data to the localStorage
    #saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    // Add product - procedure
    addToCart(productId){
        // Get the select item and its value
        // const selectElement = document.querySelector(`.js-quantity-selector-${productId}`);
        // const quantity = Number(selectElement.value);
        let quantity = 1;
        let matchingItem = this.getCartItem(productId);

        // Check whether I found the element or not
        if(matchingItem) matchingItem.quantity += quantity;
        else {
            this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        })};

        // Update the cart quantity displayed in the page
        this.#saveToStorage();
    }

    // Remove product - procedure
    removeFromCart(productId){
        this.cartItems.forEach((cartItem,index)=>{
            if(cartItem.productId === productId) this.cartItems.splice(index,1);
        });
        this.#saveToStorage();
    }

    // Update a product - procedure
    // Returns 1 if the procedure has succeded
    // Returns -1 if the procedure has failed
    // Returns 0 if the product has been deleted
    updateFromCart(productId,quantity){
        // Get the number
        let q = Number(quantity);

        // Check if the quantity is 0
        if(q === 0){
            this.removeFromCart(productId);
            return 0;
        } else if(q < 0 || isNaN(q) || !Number.isInteger(q)) return -1;
        else if(q!=this.getProductQuantity(productId)) {
            // Find the product and change its quantity
            this.cartItems.forEach((cartItem)=>{
                if(cartItem.productId === productId) cartItem.quantity = q;
            })
            this.#saveToStorage();
            return 1;
        }

        return 1;
    }

    // Update the cart - procedure
    updateCartQuantity(){
        let quantity = 0;
        this.cartItems.forEach((cartItem)=>{
            quantity+=cartItem.quantity;
        });    

        // Update the HTML
        return quantity;
    }

    // Get the product quantity - function
    getProductQuantity(productId){
        // Return value
        let quantity = 0;

        // Search for it
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId === productId) quantity = cartItem.quantity;
        })

        // Return the value
        return Number(quantity);
    }

    // Get a product from the cart - function
    getCartItem(productId){
        // Return value
        let ret;
        // Loop through the cart and find the product
        this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId) {  
                ret = cartItem;
            }
        });    

        // Return the value
        return ret;
    }

    // Returns the total amount of cart items - function
    getCartItems(){
        // Ret value
        let ret = 0;

        this.cartItems.forEach((_)=>{
            ret++;
        })
        
        return ret;
    }

    // Update the delivery option of a product - procedure
    updateDeliveryOption(productId,deliveryOptionId){
        // Get the product
        let product = this.getCartItem(productId);

        // Update the delivery option
        product.deliveryOptionId = deliveryOptionId;
        this.#saveToStorage();
    }

    // Get the entire cost of the cart
    getFullCost(){
        // Ret value
        let ret = 0;

        // Loop through the cart
        this.cartItems.forEach((cartItem)=>{
            // Obtain the current product
            let product = this.getProduct(cartItem.productId);

            // Get the delivery option
            let option = this.getDeliveryOption(cartItem.deliveryOptionId);

            // Sum the price times the quantity
            ret+=(product.priceCents*cartItem.quantity);
        })

        // Return the value
        return ret;
    }

    // Get the entire shipping cost of the cart
    getShippingCost(){
        // Ret value
        let ret = 0;

        // Loop through the cart
        this.cartItems.forEach((cartItem)=>{
            // Get the delivery option
            let option = this.getDeliveryOption(cartItem.deliveryOptionId);

            // Sum the price times the quantity
            ret+=option.priceCents;
        })

        // Return the value
        return ret;
    }

    // Get the cart quantity
    getCartQuantity(){
        // Ret value
        let ret = 0;

        this.cartItems.forEach((cartItem)=>{
            ret+=cartItem.quantity;
        })
        
        return ret;
    }

    // Describes the internal state of the current object - function
    toString(){
        return "Number of items: " + this.getCartItems() + ", Name: " + this.localStorageKey;
    }
};

const cart = new Cart("cart-class");
const businessCart = new Cart("business-cart-class");
console.log(cart)
console.log(businessCart)
console.log(businessCart instanceof Cart)
