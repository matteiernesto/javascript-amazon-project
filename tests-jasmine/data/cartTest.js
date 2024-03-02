import {addToCart,cart,loadFromStorage,removeFromCart} from '../../data/cart.js';

// Create a test suite (name - function)
describe('Test suite: addToCart',()=>{
    // Before each hook, that moves the setup code in each test
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');
    });

    it('Adds an existing product to the cart',()=>{       
        // Mocking an element (element - method )
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        // Checks if localStorage.setItem() received the correct values
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }]));

        // Checks how many times the function have been called in the code above
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // Checks the first product of the cart
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // Checks the quantity
        expect(cart[0].quantity).toEqual(2);
    });

    it('Adds a new product to the cart',()=>{
        // Mocking an element (element - method )
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        // Checks if localStorage.getItem() received the correct values
        expect(localStorage.getItem).toHaveBeenCalledWith('cart');

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1);

        // Checks how many times the function have been called in the code above
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // Checks the first product of the cart
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // Checks the quantity
        expect(cart[0].quantity).toEqual(1);
    });
});

describe('Test suite: removeFromCart',()=>{
    // Mock localStorage.setItem
    beforeEach(()=>{
        spyOn(localStorage,'setItem');

        // Fill the cart each time with fake products
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        
        loadFromStorage();
    });  

    it('Remove a productId that is in the cart',()=>{
        // Remove the product
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // Check if the cart lenght is now 0
        expect(cart.length).toEqual(0);

        // Check if the cart looks like what it should
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart','[]');
    });

    it('Remove a productId that is not in the cart',()=>{
        // Try to remove something that is not in the cart
        removeFromCart('sadsad');

        // Check if the cart stayed the same
        expect(cart.length).toEqual(1);

        // Check if the cart looks like what it should
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
    });
    
    
});